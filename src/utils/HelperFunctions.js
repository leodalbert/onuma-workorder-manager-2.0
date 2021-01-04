import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';

// function returns priority level string from number
export const priority = (num) => {
  const levels = [
    'Not specified',
    'Urgent',
    'Immediate',
    'Today',
    'Within a week',
    'When possible',
  ];
  return levels[num];
};

//   function to add line breaks to to array
export const insertBreak = (arr) => {
  return arr.reduce((result, element, index, array) => {
    result.push(element);
    if (index < array.length - 1) {
      result.push(<br key={index} />);
    }
    return result;
  }, []);
};

// function to generate list of fields workorder page pt 1

export const workOrderRequestFieldGen = (workOrder) => {
  const {
    request_number,
    request_date,
    assigned_priority,
    request_email,
    submitted_by,
    building,
    space,
    request_telephone,
    due_date,
    assigned_trade,
    maintenance_procedure_description,
  } = workOrder;

  let FIELDS = [];
  request_number &&
    FIELDS.push({ lable: 'Request number:', detail: request_number });
  request_date &&
    FIELDS.push({
      lable: 'Request date:',
      detail: dayjs(request_date).format('MM/DD/YYYY h:m A'),
    });
  assigned_priority &&
    FIELDS.push({
      lable: 'Priority:',
      detail: priority(assigned_priority),
      detailColor: assigned_priority === 1 && 'redDetail',
    });
  due_date &&
    FIELDS.push({
      lable: 'Due date:',
      detail: dayjs(due_date).format('MM/DD/YYYY'),
      detailColor: 'detailRed',
    });

  request_email &&
    FIELDS.push({
      lable: 'Submited by:',
      detail: insertBreak([
        <a
          key={request_email}
          style={{ textDecoration: 'none' }}
          href={
            'mailto:' +
            request_email +
            `?subject=Workorder request for room ${space && space.number} in ${
              building.name
            }`
          }>{`${submitted_by} (${request_email})`}</a>,
        request_telephone && (
          <a
            key={request_telephone}
            style={{ textDecoration: 'none' }}
            href={'tel:' + request_telephone}>
            {request_telephone}
          </a>
        ),
      ]),
    });
  assigned_trade &&
    FIELDS.push({
      lable: 'Assigned trade:',
      detail: assigned_trade,
    });
  maintenance_procedure_description &&
    FIELDS.push({
      lable: 'PM description',
      detail: maintenance_procedure_description,
    });

  return FIELDS;
};

// function to generate list of fields workorder page pt 2

export const workOrderCommentFieldGen = (workOrder) => {
  const {
    request_description,
    administrator_to_technician_comment,
  } = workOrder;

  let FIELDS = [];
  request_description &&
    FIELDS.push({
      lable: 'Request description:',
      detail: insertBreak(request_description.split('\r\n')),
    });

  administrator_to_technician_comment &&
    FIELDS.push({
      lable: 'Administrator comments:',
      detail: administrator_to_technician_comment,
    });

  return FIELDS;
};

// function to generate list of fields workorder page pt 2

export const workOrderLocationFieldGen = (workOrder) => {
  const { building, floor, space, location_description } = workOrder;

  let FIELDS = [];
  (building.number || building.name) &&
    FIELDS.push({
      lable: 'Location:',
      detail: [
        `${building.number} ${(building.number || building.name) && '- '}${
          building.name
        }`,
        !!floor && !!floor.name && <br key='1' />,
        !!floor && !!floor.name && floor.name,
        !!space && <br key='2' />,
        !!space && space.number && space.number,
        ' ',
        !!space && space.number && space.name && '- ',
        !!space && space.name && space.name,
        location_description && <br key='3' />,
        location_description && location_description,
      ],
    });

  return FIELDS;
};

// function to check if in Dev
export const inDev = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return true;
  }
};
