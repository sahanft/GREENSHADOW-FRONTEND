$(document).ready(function() {
  // loadEquipmentIdToModal();
  // loadStaffIdsToEquipmentModal();
  // loadFieldIdsToEquipmentModal();
  // loadEquipmentDetailsTable();
})

function loadEquipmentIdToModal() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/equipment/newid',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      $("#equipmentId_modal").text(data.data);
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

$('#btn_save_equipment').click(function() {
  const equipment = {
    equipmentId: $('#equipmentId_modal').text(),
    name: $('#name_modal_equipment').val(),
    type: $('#type_modal_equipment').val(),
    status: $('#status_modal_equipment').val(),
    staffId: $('#staffId_modal_equipment').val(),
    fieldCode: $('#fieldCode_modal_equipment').val(),
  }

  $.ajax({
    url: 'http://localhost:8080/greenshadow/equipment',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(equipment),
    processData: false, 
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      loadEquipmentIdToModal();
      loadEquipmentDetailsTable();
      $('#modal_equipment').modal('hide');
      $('#name_modal_equipment').val('');
      $('#type_modal_equipment').val('');
      $('#status_modal_equipment').val('');
      $('#staffId_modal_equipment').val('');
      $('#fieldCode_modal_equipment').val('');
      alert("Equipment saved successfully!");
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
})

function loadStaffIdsToEquipmentModal() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const dropDown = $('#staffId_modal_equipment');
      dropDown.empty();
      dropDown.append(`<option value="" selected disabled>Select Staff</option>`);
      data.data.forEach(data => {
        const option = `<option value="${data.staffId}">${data.staffId} ${data.firstName} ${data.lastName}</option>`;
        dropDown.append(option);
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function loadFieldIdsToEquipmentModal() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/field',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const dropDown = $('#fieldCode_modal_equipment');
      dropDown.empty();
      dropDown.append(`<option value="" selected disabled>Select Field</option>`);
      data.data.forEach(data => {
        const option = `<option value="${data.fieldCode}">${data.fieldCode} ${data.name}</option>`;
        dropDown.append(option);
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function loadEquipmentDetailsTable() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/equipment',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const tableBody = $('#equipment_details_table_body');
      tableBody.empty();
      data.data.forEach(data => {
        const row = `
          <tr>
            <td>${data.equipmentId}</td>
            <td>${data.name}</td>
            <td>${data.type}</td>
            <td>${data.status}</td>
            <td>${data.staffId}</td>
            <td>${data.fieldCode}</td>
            <td><button type="button" class="btn btn-primary btn-update-equipment" data-bs-toggle="modal" data-bs-target="#modal_equipment_update"
            data-equipment-id="${data.equipmentId}"
            data-name="${data.name}"
            data-type="${data.type}"
            data-status="${data.status}"
            data-staff-id="${data.staffId}"
            data-field-code="${data.fieldCode}"
            >Update</button></td>
            <td><button type="button" class="btn btn-danger btn-delete-equipment" data-equipment-id="${data.equipmentId}">Delete</button></td>
          </tr>
        `;
        tableBody.append(row);
      });
      $('.btn-delete-equipment').click(function() {
        const equipmentId = $(this).data('equipment-id');
        deleteEquipment(equipmentId);
      });

      $('.btn-update-equipment').click(function() {
        const equipmentId = $(this).data('equipment-id');
        loadUpdateEquipmentModal(equipmentId);
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function deleteEquipment(equipmentId) {
  const confirmation = confirm('Are you sure you want to delete this equipment? : ' + equipmentId);
  if (confirmation) {
    $.ajax({
      url: 'http://localhost:8080/greenshadow/equipment/' + equipmentId,
      type: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function(data) {
        loadEquipmentDetailsTable();
        loadEquipmentIdToModal();
        alert(equipmentId + ' : Equipment deleted successfully!');
      },
      error: function(error) {
        alert(error.responseText);
      }
    });
  }
}

function loadUpdateEquipmentModal(equipmentId) {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/equipment/' + equipmentId,
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      $('#equipmentId_modal_update').text(data.data.equipmentId); 
      $('#name_modal_equipment_update').val(data.data.name);
      $('#type_modal_equipment_update').val(data.data.type);
      $('#status_modal_equipment_update').val(data.data.status);
      //$('#staffId_modal_equipment_update').val(data.data.staffId);
      loadStaffIdToUpdateEquipmentModal(data.data.staffId);
      loadStaffIdsToUpdateEquipmentModal();
      loadFieldIdToUpdateEquipmentModal(data.data.fieldCode);
      loadFieldIdsToUpdateEquipmentModal()
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function loadStaffIdToUpdateEquipmentModal(staffId) {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff/' + staffId,
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const dropDown = $('#staffId_modal_equipment_update');
      dropDown.empty()
      dropDown.append(`<option value="${data.data.staffId}">${data.data.staffId} ${data.data.firstName} ${data.data.lastName}</option>`);
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function loadStaffIdsToUpdateEquipmentModal() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const dropDown = $('#staffId_modal_equipment_update');
      dropDown.append(`<option value="" disabled>Select Staff</option>`);
      data.data.forEach(data => {
        const option = `<option value="${data.staffId}">${data.staffId} ${data.firstName} ${data.lastName}</option>`;
        if (data.staffId !== $('#staffId_modal_equipment_update').val()) {
          dropDown.append(option);
        }
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function loadFieldIdToUpdateEquipmentModal(fieldCode) {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/field/' + fieldCode,
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const dropDown = $('#fieldCode_modal_equipment_update');
      dropDown.empty()
      dropDown.append(`<option value="${data.data.fieldCode}">${data.data.fieldCode} ${data.data.name} ${data.data.location}</option>`);
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function loadFieldIdsToUpdateEquipmentModal() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/field',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const dropDown = $('#fieldCode_modal_equipment_update');
      dropDown.append(`<option value="" disabled>Select Field</option>`);
      data.data.forEach(data => {
        const option = `<option value="${data.fieldCode}">${data.fieldCode} ${data.name} ${data.location}</option>`;
        if (data.fieldCode !== $('#fieldCode_modal_equipment_update').val()) {
          dropDown.append(option);
        }
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

$('#btn_update_equipment').click(function() {
  const equipment = {
    equipmentId: $('#equipmentId_modal_update').text(),
    name: $('#name_modal_equipment_update').val(),
    type: $('#type_modal_equipment_update').val(),
    status: $('#status_modal_equipment_update').val(),
    staffId: $('#staffId_modal_equipment_update').val(),
    fieldCode: $('#fieldCode_modal_equipment_update').val(),
  };
  $.ajax({
    url: 'http://localhost:8080/greenshadow/equipment',
    type: 'PUT',
    data: JSON.stringify(equipment),
    contentType: 'application/json',
    processData: false,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      loadEquipmentDetailsTable();
      loadEquipmentIdToModal();
      alert(equipment.equipmentId + ' : Equipment updated successfully!');
      $('#modal_equipment_update').modal('hide');
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
});

