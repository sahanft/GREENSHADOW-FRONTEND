$(document).ready(function() {
  // loadStaffIdToModel();
  // loadStaffDetailsTable();
});

function loadStaffIdToModel() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff/newid',
    type: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      $('#id_modal_staff').text(data.data);
    },

    error: function (error) {
      alert(error.responseText);
    }
  });
}

$('#btn_save_staff').click(function() {
  const staff = {
    staffId: $('#id_modal_staff').text(),
    firstName: $('#firstName_modal_staff').val(),
    lastName: $('#lastName_modal_staff').val(),
    joinDate: $('#joinedDate_modal_staff').val(),
    birthDate: $('#birthDate_modal_staff').val(),
    gender: $('#gender_modal_staff').val(),
    phone: $('#phone_modal_staff').val(),
    email: $('#email_modal_staff').val(),
    designation: $('#designation_modal_staff').val(),
    role: $('#role_modal_staff').val(),
    addressLine1: $('#address1_modal_staff').val(),
    addressLine2: $('#address2_modal_staff').val(),
    addressLine3: $('#address3_modal_staff').val(),
    addressLine4: $('#address4_modal_staff').val(),
    addressLine5: $('#address5_modal_staff').val(),
  }

  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff',
    type: 'POST',
    data: JSON.stringify(staff),
    contentType: 'application/json',
    processData: false,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      alert("Staff saved successfully!");
      $('#firstName_modal_staff').val('');
      $('#lastName_modal_staff').val('');
      $('#joinedDate_modal_staff').val('');
      $('#birthDate_modal_staff').val('');
      $('#gender_modal_staff').val('');
      $('#phone_modal_staff').val('');
      $('#email_modal_staff').val('');
      $('#designation_modal_staff').val('');
      $('#role_modal_staff').val('');
      $('#address1_modal_staff').val('');
      $('#address2_modal_staff').val('');
      $('#address3_modal_staff').val('');
      $('#address4_modal_staff').val('');
      $('#address5_modal_staff').val('');
      $('#modal_staff').modal('hide');
      loadStaffIdToModel();
      loadStaffDetailsTable();
    },
    error: function (error) {
      alert(error.responseText);
    }  
  });
});

function loadStaffDetailsTable() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      const tableBody = $('#staff_details_table_body');
      tableBody.empty();
      data.data.forEach(data => {
        const row = `
          <tr>
            <td>${data.staffId}</td>
            <td>${data.firstName}</td>
            <td>${data.lastName}</td>
            <td>${data.joinDate}</td>
            <td>${data.birthDate}</td>
            <td>${data.gender}</td>
            <td>${data.phone}</td>
            <td>${data.email}</td>
            <td>${data.designation}</td>
            <td>${data.role}</td>
            <td>${data.addressLine1}</td>
            <td>${data.addressLine2}</td>
            <td>${data.addressLine3}</td>
            <td>${data.addressLine4}</td>
            <td>${data.addressLine5}</td>
            <td><button type="button" class="btn btn-primary btn-update-staff" data-bs-toggle="modal" data-bs-target="#modal_staff_update"
            data-staff-id="${data.staffId}"
            data-first-name="${data.firstName}"
            data-last-name="${data.lastName}"
            data-joined-date="${data.joinDate}"
            data-birth-date="${data.birthDate}"
            data-gender="${data.gender}"
            data-phone="${data.phone}"
            data-email="${data.email}"
            data-designation="${data.designation}"            
            data-role="${data.role}"
            data-address1="${data.addressLine1}"
            data-address2="${data.addressLine2}"
            data-address3="${data.addressLine3}"
            data-address4="${data.addressLine4}"
            data-address5="${data.addressLine5}"
            >Update</button></td>
            <td><button type="button" class="btn btn-danger btn-delete-staff" data-staff-id="${data.staffId}">Delete</button></td>            
          </tr>
        `;
        tableBody.append(row);
      });

      $('.btn-delete-staff').on('click', function() {
        const staffId = $(this).data('staff-id');
        deleteStaff(staffId);
      });

      $('.btn-update-staff').on('click', function() {
        const staffId = $(this).data('staff-id');
        loadUpdateStaffModel(staffId);
      });
    },
    error: function (error) { 
      alert(error.responseText);
    }  
  });
}

function deleteStaff(staffId) {
  const confirmed = confirm('Are you sure you want to delete this staff? : ' + staffId);
  if (confirmed) {
    $.ajax({
      url: 'http://localhost:8080/greenshadow/staff/' + staffId,
      type: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function (data) {
        loadStaffDetailsTable();
        loadStaffIdToModel();
        alert(staffId + " : Staff deleted successfully!");
      },
      error: function (error) {
        alert(error.responseText);
      }
    });
  }
}

function loadUpdateStaffModel(staffId) {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff/' + staffId,
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      $('#id_modal_staff_update').text(data.data.staffId);
      $('#firstName_modal_staff_update').val(data.data.firstName);
      $('#lastName_modal_staff_update').val(data.data.lastName);
      $('#joinedDate_modal_staff_update').val(data.data.joinDate);
      $('#birthDate_modal_staff_update').val(data.data.birthDate);
      $('#gender_modal_staff_update').val(data.data.gender);
      $('#phone_modal_staff_update').val(data.data.phone);
      $('#email_modal_staff_update').val(data.data.email);
      $('#designation_modal_staff_update').val(data.data.designation);
      $('#role_modal_staff_update').val(data.data.role);
      $('#address1_modal_staff_update').val(data.data.addressLine1);
      $('#address2_modal_staff_update').val(data.data.addressLine2);
      $('#address3_modal_staff_update').val(data.data.addressLine3);
      $('#address4_modal_staff_update').val(data.data.addressLine4);
      $('#address5_modal_staff_update').val(data.data.addressLine5);
      $('#modal_staff_update').modal('show');
    },
    error: function (error) {
      alert(error.responseText);
    }  
  });
}

$('#btn_update_staff').click(function() {
  const staffId = $('#id_modal_staff_update').text();
  const staff = {
    staffId: staffId,
    firstName: $('#firstName_modal_staff_update').val(),
    lastName: $('#lastName_modal_staff_update').val(),
    joinDate: $('#joinedDate_modal_staff_update').val(),
    birthDate: $('#birthDate_modal_staff_update').val(),
    gender: $('#gender_modal_staff_update').val(),
    phone: $('#phone_modal_staff_update').val(),
    email: $('#email_modal_staff_update').val(),
    designation: $('#designation_modal_staff_update').val(),
    role: $('#role_modal_staff_update').val(),
    addressLine1: $('#address1_modal_staff_update').val(),
    addressLine2: $('#address2_modal_staff_update').val(),
    addressLine3: $('#address3_modal_staff_update').val(),
    addressLine4: $('#address4_modal_staff_update').val(),
    addressLine5: $('#address5_modal_staff_update').val(),
  };

  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff',
    type: 'PUT',  
    data: JSON.stringify(staff),
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function (data) {
      loadStaffDetailsTable();
      loadStaffIdToModel();
      $('#modal_staff_update').modal('hide');
      alert(staffId + " : Staff updated successfully!");
    },
    error: function (error) {
      alert(error.responseText);
    }  
  });
});






