$(document).ready(function() {
  // loadVehicleIdToModel();
  // loadStaffIdsToVehicleModel();
  // loadVehicleDetailsTable();
});

function loadVehicleIdToModel() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/vehicle/newcode',
    type: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      $('#code_modal_vehicle').text(data.data);
    }
  });
}

$('#btn-save-vehicle').click(function () {
  const vehicle = {
    vehicleCode: $('#code_modal_vehicle').text(),
    vehicleNumber: $('#vehicleNumber_modal_vehicle').val(),
    vehicleCategory: $('#category_modal_vehicle').val(),
    fuelType: $('#fuelType_modal_vehicle').val(),
    status: $('#status_modal_vehicle').val(),
    remarks: $('#remarks_modal_vehicle').val(),
    staffId: $('#staffId_modal_vehicle').val(),
  }

  $.ajax({
    url: 'http://localhost:8080/greenshadow/vehicle',
    type: 'POST',
    data: JSON.stringify(vehicle),
    contentType: 'application/json',
    processData: false,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      $('#modal_vehicle').modal('hide');
      loadVehicleIdToModel();
      alert("Vehicle added successfully!");
    },
    error: function (error) {
      alert(error.responseText);
    }
  });
});

function loadStaffIdsToVehicleModel() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      const dropDown = $('#staffId_modal_vehicle');
      dropDown.empty();
      dropDown.append(`<option value="" selected disabled>Select Staff</option>`);
      data.data.forEach(data => {
        const option = `<option value="${data.staffId}">${data.staffId} ${data.firstName} ${data.lastName}</option>`;
        dropDown.append(option);
      });
    }
  });
}

$('#btn_save_vehicle').click(function () {
  const vehicle = {
    vehicleCode: $('#code_modal_vehicle').text(),
    vehicleNumber: $('#vehicleNumber_modal_vehicle').val(),
    vehicleCategory: $('#category_modal_vehicle').val(),
    fuelType: $('#fuelType_modal_vehicle').val(),
    status: $('#status_modal_vehicle').val(),
    remarks: $('#remarks_modal_vehicle').val(),
    staffId: $('#staffId_modal_vehicle').val(),
  }

  $.ajax({
    url: 'http://localhost:8080/greenshadow/vehicle',
    type: 'POST',
    data: JSON.stringify(vehicle),
    contentType: 'application/json',
    processData: false,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      loadVehicleIdToModel();
      $('#vehicleNumber_modal_vehicle').val('');
      $('#category_modal_vehicle').val('');
      $('#fuelType_modal_vehicle').val('');
      $('#status_modal_vehicle').val('');
      $('#remarks_modal_vehicle').val('');
      $('#staffId_modal_vehicle').val('');
      alert("Vehicle added successfully!");
      $('#vehicle_modal').modal('hide');
      loadVehicleDetailsTable();
    },
    error: function (error) {
      alert(error.responseText);
    }
  })
});

function loadVehicleDetailsTable() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/vehicle',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      const tableBody = $('#vehicle_details_table_body');
      tableBody.empty();
      data.data.forEach(data => {
        const row = `<tr>
          <td>${data.vehicleCode}</td>
          <td>${data.vehicleNumber}</td>
          <td>${data.vehicleCategory}</td>
          <td>${data.fuelType}</td>
          <td>${data.status}</td>
          <td>${data.remarks}</td>
          <td>${data.staffId}</td>
          <td><button type="button" class="btn btn-primary btn-update-vehicle" data-bs-toggle="modal" data-bs-target="#vehicle_modal_update"
            data-vehicle-code="${data.vehicleCode}"
            data-vehicle-number="${data.vehicleNumber}"
            data-vehicle-category="${data.vehicleCategory}"
            data-fuel-type="${data.fuelType}"
            data-status="${data.status}"
            data-remarks="${data.remarks}"
            data-staff-id="${data.staffId}"
            >Update</button></td>
          <td><button type="button" class="btn btn-danger btn-delete-vehicle" data-vehicle-code="${data.vehicleCode}">Delete</button></td>   
        </tr>`;
        tableBody.append(row);
      });

      $('.btn-delete-vehicle').click(function () {
        const vehicleCode = $(this).data('vehicle-code');
        deleteVehicle(vehicleCode);
      });

      $('.btn-update-vehicle').click(function () {
        const vehicleCode = $(this).data('vehicle-code');
        loadUpdateVehicleModal(vehicleCode);
      });
    }
  });
}

function deleteVehicle(vehicleCode) {
  const confirmation = confirm("Are you sure you want to delete this vehicle?");
  if (confirmation) {
    $.ajax({
      url: 'http://localhost:8080/greenshadow/vehicle/' + vehicleCode,
      type: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function (data) {
        loadVehicleDetailsTable();
        loadVehicleIdToModel();
        alert(vehicleCode + " : Vehicle deleted successfully!");
      },
      error: function (error) {
        alert(error.responseText);
      }
    });
  }
}

function loadUpdateVehicleModal(vehicleCode) {
  console.log(vehicleCode);
  $.ajax({
    url: 'http://localhost:8080/greenshadow/vehicle/' + vehicleCode,
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      $('#code_modal_vehicle_update').text(data.data.vehicleCode);
      $('#vehicleNumber_modal_vehicle_update').val(data.data.vehicleNumber);
      $('#category_modal_vehicle_update').val(data.data.vehicleCategory);
      $('#fuelType_modal_vehicle_update').val(data.data.fuelType);
      $('#status_modal_vehicle_update').val(data.data.status);
      $('#remarks_modal_vehicle_update').val(data.data.remarks);
      loadStaffIdToUpdateVehicleModal(data.data.staffId);
      loadStaffIdsToVehicleUpdateModal();
      $('#modal_vehicle_update').modal('show');
    },
    error: function (error) {
      alert(error.responseText);
    }
  });
}

$('#btn_update_vehicle').click(function () {
  const vehicleCode = $('#code_modal_vehicle_update').text();
  const vehicle = {
    vehicleCode: vehicleCode,
    vehicleNumber: $('#vehicleNumber_modal_vehicle_update').val(),
    vehicleCategory: $('#category_modal_vehicle_update').val(),
    fuelType: $('#fuelType_modal_vehicle_update').val(),
    status: $('#status_modal_vehicle_update').val(),
    remarks: $('#remarks_modal_vehicle_update').val(),
    staffId: $('#staffId_modal_vehicle_update').val(),
  };
  $.ajax({
    url: 'http://localhost:8080/greenshadow/vehicle', 
    type: 'PUT',
    data: JSON.stringify(vehicle),  
    contentType: 'application/json',
    processData: false,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      loadVehicleDetailsTable();
      loadVehicleIdToModel();
      alert(vehicleCode + " : Vehicle updated successfully!");  
      $('#vehicle_modal_update').modal('hide');
    },
    error: function (error) {
      alert(error.responseText);
    }
  });
});

function loadStaffIdToUpdateVehicleModal(staffId) {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff/' + staffId,
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      const dropDown = $('#staffId_modal_vehicle_update');
      dropDown.empty();
      dropDown.append(`<option value="${data.data.staffId}">${data.data.staffId} ${data.data.firstName} ${data.data.lastName}</option>`);
    },
    error: function (error) {
      alert(error.responseText);
    }
  });
}

function loadStaffIdsToVehicleUpdateModal() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      const dropDown = $('#staffId_modal_vehicle_update');
      dropDown.append(`<option value=""disabled>Select Staff</option>`);
      data.data.forEach(data => {
        const option = `<option value="${data.staffId}">${data.staffId} ${data.firstName} ${data.lastName}</option>`;
        if (data.staffId !== $('#staffId_modal_vehicle_update').val()) {
          dropDown.append(option);
        }
      });
    }
  });
}