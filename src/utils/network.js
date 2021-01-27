import axios from 'axios';
import { BASE_URL } from './environment';
import { inDev } from './HelperFunctions';

axios.interceptors.response.use((response) => response.data);
if (inDev()) {
  axios.defaults.headers.common = {
    Authorization: 'Bearer ' + process.env.REACT_APP_BEARER_TOKEN,
  };
}

// TODO - is baseURL required?

const network = () => {
  const baseUrl = BASE_URL;
  const headers = {
    // Authorization: 'Bearer ' + process.env.REACT_APP_BEARER_TOKEN,
  };

  // Start Cookie Session
  const startSession = (token, email, studioId) => {
    const uninterceptedAxiosInstance = axios.create({
      // remove auth header for start session request (only affects dev)
      transformRequest: [
        (data, headers) => {
          delete headers.common.Authorization;
          return data;
        },
      ],
    });
    return uninterceptedAxiosInstance.get(
      `${baseUrl}/${studioId}/actions/start-technician-session?token=${token}&email=${email}`
    );
  };

  // Start Requester Cookie Session
  const startRequesterSession = (token, email, studioId, workorder) => {
    const uninterceptedAxiosInstance = axios.create({
      // remove auth header for start session request (only affects dev)
      transformRequest: [
        (data, headers) => {
          delete headers.common.Authorization;
          return data;
        },
      ],
    });
    return uninterceptedAxiosInstance.get(
      `${baseUrl}/${studioId}/actions/start-requester-session?token=${token}&email=${email}&workorder_id=${workorder}`
    );
  };

  // Start CC Cookie Session
  const startCcSession = (email, studioId, workorder) => {
    const uninterceptedAxiosInstance = axios.create({
      // remove auth header for start session request (only affects dev)
      transformRequest: [
        (data, headers) => {
          delete headers.common.Authorization;
          return data;
        },
      ],
    });
    return uninterceptedAxiosInstance.get(
      `${baseUrl}/${studioId}/actions/start-cc-session?workorder=${workorder}&email=${email}`
    );
  };

  // Refresh session cookie
  const refreshSession = (studioId, techEmail, token) => {
    return axios.get(
      `/${studioId}/actions/start-technician-session?token=${token}&email=${techEmail}&resume=1`
    );
  };

  // Expire session cookie
  const logout = () => {
    return axios.get(`https://system.onuma.com/user/logout`);
  };

  // Get all work orders by tech Id
  const getAllWorkordersByTech = (techEmail, studioId) => {
    const config = { headers };
    return axios.get(
      `/${studioId}/api/items/workorder?limit=9999&fields=id,request_number,request_date,request_description,request_number,building,assigned_priority,space,assigned_technician,assigned_technician.email,status,collaborators.collaborator&filter[collaborators.collaborator.email][in]=${techEmail}&filter[assigned_technician.email][in]=${techEmail}&filter[assigned_technician.email][logical]=or`,
      config
    );
  };

  //   Get all techs in site group
  const getAllTechs = (studioId, siteGroup) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/technician?limit=9999&filter[site_group.id]=${siteGroup}&fields=id,first_name,last_name,email`,
      config
    );
  };

  // Get tech by Email
  const getCurrentTech = (techEmail, studioId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/technician?fields=*,*.*&filter[email]=${techEmail}`,
      config
    );
  };

  //   Get floor 0 id of building
  const getFloor0Id = (buildingId, studioId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/building?filter[id]=${buildingId}&fields=floors.id`,
      config
    );
  };

  //   Get Workorder by workorder Id
  const getWorkorderById = (workorderId, studioId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/workorder/${workorderId}?fields=*,*.*,id,status,token,request_number,building.id,building.site,building.number,building.name,floor.name,floor.id,floor.number,space.id,space.number,space.name,submitted_by,request_email,assigned_priority,request_date,request_description,components.component,components.id,tasks.*,assigned_technician.id,assigned_technician.first_name,assigned_technician.last_name,assigned_technician.email,assigned_technician.site_group,location_description,request_telephone,due_date,administrator_to_technician_comment,administrator_comment,collaborators.collaborator,collaborators.id,assigned_trade,collaborators.collaborator.email,collaborators.collaborator.id,request_email_cc,preventive_maintenance,maintenance_procedures`,
      config
    );
  };

  //   Get Workorder tech info for auth
  const getTechForAuth = (workorderId, studioId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/workorder/${workorderId}?fields=assigned_technician.email,collaborators.collaborator.email,collaborators.collaborator.token`,
      config
    );
  };

  // Get all files attached to work order
  const getWorkorderFiles = (workorderId, studioId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/workorder_directus_files?filter[workorder]=${workorderId}&fields=id,directus_files.id,directus_files.type,directus_files.title,directus_files.uploaded_on,directus_files.width,directus_files.filename_download,directus_files.technician,directus_files.height,directus_files.data.*`,
      config
    );
  };

  //   Patch workorder status change
  const workOrderStatusChange = (workorderId, status, studioId) => {
    const config = { headers };
    const data = { status };
    return axios.patch(
      `${baseUrl}/${studioId}/api/items/workorder/${workorderId}`,
      data,
      config
    );
  };

  //   Post new collaborator to workorder
  const addCollaborator = (workorderId, techId, studioId) => {
    const config = { headers };
    const data = {
      workorder: { id: workorderId },
      collaborator: { id: techId },
    };
    return axios.post(
      `${baseUrl}/${studioId}/api/items/workorder_collaborator`,
      data,
      config
    );
  };

  //   Remove collaborator from workorder
  const removeCollaborator = (collaboratorId, studioId) => {
    const config = { headers };
    return axios.delete(
      `${baseUrl}/${studioId}/api/items/workorder_collaborator/${collaboratorId}`,
      config
    );
  };

  // get directus_file data for new record
  const getFileInfo = (studioId, fileWorkorderId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/workorder_directus_files/${fileWorkorderId}?fields=id,directus_files.*`,
      config
    );
  };

  // Post new workorder_directus_files record with new directus_files record
  const patchWorkorderWithFile = (id, studioId, workorderId) => {
    const config = { headers };
    const data = {
      workorder: workorderId,
      directus_files: id,
    };
    return axios.post(
      `${baseUrl}/${studioId}/api/items/workorder_directus_files?filter[workorder]=${workorderId}`,
      data,
      config
    );
  };

  // Delete workorder_directus_files record
  const deleteAttachment = (id, studioId) => {
    const config = { headers };
    return axios.delete(
      `${baseUrl}/${studioId}/api/items/workorder_directus_files/${id}`,
      config
    );
  };

  // Upload file Attachment
  const uploadFile = (data, studioId, techId) => {
    const config = {
      headers: { ...headers, 'content-type': 'multipart/form-data' },
    };
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('technician', techId);
    return axios.post(`${baseUrl}/${studioId}/api/files`, formData, config);
  };

  // Patch Workorder with new comment to requestor
  const sendCommentToRequestor = (comment, studioId, workorderId) => {
    const config = { headers };
    const data = {
      administrator_comment: comment,
    };
    return axios.patch(
      `${baseUrl}/${studioId}/api/items/workorder/${workorderId}?fields=*,*`,
      data,
      config
    );
  };

  // Get all task costs for workorder
  const getTaskCosts = (studioId, tasks) => {
    const config = { headers };
    const taskIds = tasks.map((task) => task.id).join(','); // TODO - this should be handled in the action (or selector?)
    return axios.get(
      `${baseUrl}/${studioId}/api/items/workorder_cost?filter[workorder_task.id][in]=${taskIds}`,
      config
    );
  };

  // Update Workorder Task
  const updateWorkorderTask = (studioId, taskId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/workorder_task?filter[id]=${taskId}`,
      config
    );
  };

  // Post new task for workorder
  const addNewTask = (taskForm, studioId) => {
    // TODO - handle cost?
    const config = { headers };
    const data = taskForm;
    return axios.post(
      `${baseUrl}/${studioId}/api/items/workorder_task`,
      data,
      config
    );
  };

  //   Post new cost
  const addNewCost = (cost, taskId, studioId) => {
    cost.workorder_task = taskId; // TODO - this should be handled in the action (or selector?)
    const config = { headers };
    const data = cost;
    return axios.post(
      `${baseUrl}/${studioId}/api/items/workorder_cost`,
      data,
      config
    );
  };

  // Get all components by space id
  const getSpaceComponents = (spaceId, studioId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/space/${spaceId}?fields=components.component.name,components.component.id,components.component.instance_name`,
      config
    );
  };

  // Get component Attachments
  const getComponentFiles = (componentId, studioId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/shared/list-attachments.load?component_id=${componentId}`,
      config
    );
  };

  //   Get details for work order components
  const getWorkOrderComponentDetails = (componentId, studioId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/component/${componentId}?fields=id,component_type.model_number,component_type.description,component_type.name,component_type.manufacturer,component_type.parts_warranty_guarantor,component_type.parts_warranty_duration,component_type.labour_warranty_guarantor,component_type.labour_warranty_duration,component_type.warranty_duration_unit,component_type.category,name,instance_name,description,serial_number,barcode,installation_date,warranty_start_date,space_component.space.name,space_component.id,space_component.space.floor.name,space_component.space.floor.number,space_component.space.number,component_type.attributes,attributes,`,
      config
    );
  };

  // Post component to work order
  const addComponent = (componentId, workorderId, studioId) => {
    const config = { headers };
    const data = {
      component: componentId,
      workorder: workorderId,
    };
    return axios.post(
      `${baseUrl}/${studioId}/api/items/component_workorder`,
      data,
      config
    );
  };

  // Delete component from work order
  const removeComponent = (componentWorkorderId, studioId) => {
    const config = { headers };
    return axios.delete(
      `${baseUrl}/${studioId}/api/items/component_workorder/${componentWorkorderId}`,
      config
    );
  };

  // Get all components in bulding by search criteria
  const searchComponents = (searchParam, buildingId, studioId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/space_component?limit=9999&fields=id,component.name,component.id,component.barcode,component.component_type.manufacturer,component.instance_name,component.component_type.name,component.component_type.model_number,component.serial_number,component.space_component.space.name,component.space_component.space.number,component.space_component.space.floor.name, component.space_component.space.floor.number&filter[space.floor.building.id][eq]=${buildingId}&filter[component.name][contains]=${searchParam}&filter[component.component_type][contains]=${searchParam}&filter[component.component_type][logical]=or&filter[component.barcode][contains]=${searchParam}&filter[component.barcode][logical]=or&filter[component.serial_number][contains]=${searchParam}&filter[component.serial_number][logical]=or&filter[component.instance_name][contains]=${searchParam}&filter[component.instance_name][logical]=or`,
      config
    );
  };

  // Get spaces by site
  const getAllSpaces = (siteId, studioId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/building?limit=9999&filter[site]=${siteId}&fields=name,id,number,floors.name,floors.id,floors.number,floors.spaces.name,floors.spaces.id,floors.spaces.number`,
      config
    );
  };

  // Get Workorder status page details by workorder Id
  const getWorkOrderStatusDetails = (workorderId, studioId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/workorder/${workorderId}?fields=id,request_number,request_description,assigned_priority,status,status_modification_date,building.site,building.id,building.name,building.number,floor.id,floor.number,floor.name,space.id,space.name,space.number,assigned_technician.id,assigned_technician.first_name,assigned_technician.last_name,assigned_technician.email,administrator_to_technician_comment,administrator_comment,location_description,request_email,request_email_cc,token`,
      config
    );
  };

  // Get all workorders by requester email
  const getAllWorkOrderRequestsByRequester = (requestEmail, studioId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/workorder?limit=9999&fields=id,request_number,request_email,collaborators.collaborator,request_date,request_description,request_number,building,assigned_priority,space,assigned_technician,status&filter[request_email]=${requestEmail}`,
      config
    );
  };
  // Get all workorders by requester email CC
  const getAllWorkOrderRequestsByRequesterCC = (requestEmail, studioId) => {
    const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/workorder?limit=9999&fields=id,request_number,request_email,collaborators.collaborator,request_date,request_description,request_number,building,assigned_priority,space,assigned_technician,status&filter[request_email_cc][contains]=${requestEmail}`,
      config
    );
  };

  //   Patch Workorker with location and request description updates
  const updateStatusPageWorkorder = (studioId, workorderId, updatedObj) => {
    const config = { headers };
    const data = updatedObj;
    return axios.patch(
      `${baseUrl}/${studioId}/api/items/workorder/${workorderId}?fields=id,request_number,request_description,assigned_priority,status,status_modification_date,building.site,building.id,building.name,building.number,floor.id,floor.number,floor.name,space.id,space.name,space.number,assigned_technician.id,assigned_technician.first_name,assigned_technician.last_name,assigned_technician.email,administrator_to_technician_comment,administrator_comment,location_description,token`,
      data,
      config
    );
  };

  // Patch workorder update status from status page
  const setStatus = (workorderId, statusObj, studioId) => {
    const config = { headers };
    const data = statusObj;
    return axios.patch(
      `${baseUrl}/${studioId}/api/items/workorder/${workorderId}?fields=status`,
      data,
      config
    );
  };
  return {
    startSession,
    startRequesterSession,
    startCcSession,
    refreshSession,
    logout,
    getAllWorkordersByTech,
    getAllTechs,
    getCurrentTech,
    getFloor0Id,
    getWorkorderById,
    getTechForAuth,
    getWorkorderFiles,
    workOrderStatusChange,
    addCollaborator,
    removeCollaborator,
    getFileInfo,
    patchWorkorderWithFile,
    deleteAttachment,
    uploadFile,
    sendCommentToRequestor,
    getTaskCosts,
    updateWorkorderTask,
    addNewTask,
    addNewCost,
    getSpaceComponents,
    getComponentFiles,
    getWorkOrderComponentDetails,
    addComponent,
    removeComponent,
    searchComponents,
    getAllSpaces,
    getWorkOrderStatusDetails,
    updateStatusPageWorkorder,
    getAllWorkOrderRequestsByRequester,
    getAllWorkOrderRequestsByRequesterCC,
    setStatus,
  };
};

const networkServicee = network();
export default networkServicee;
