$(document).ready(function() {
  // selectFieldCodeForStaff();
  // selectStaffId();
});

function selectFieldCodeForStaff() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/field',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const dropDown = $('#sel_fs_fieldCode');
      dropDown.empty();
      dropDown.append(`<option value="" selected disabled>Select Field</option>`);
      data.data.forEach(data => {
        const option = `<option 
                        data-fieldCode="${data.fieldCode}"
                        data-name="${data.name}"
                        data-location="${data.location}"
                        data-imageOne="${data.imageOne}" 
                        data-imageTwo="${data.imageTwo}"
                        value="${data.fieldCode}">${data.fieldCode} ${data.name}</option>`;
        dropDown.append(option);
      });

      $('#sel_fs_fieldCode').on('change', function() {
        const selectedOption = $(this).find(':selected');
        const name = selectedOption.data('name');
        const location = selectedOption.data('location');
        const imageOneBase64 = selectedOption.attr('data-imageOne');
        const imageTwoBase64 = selectedOption.attr('data-imageTwo');

        const imageOneSrc = `data:image/jpeg;base64,${imageOneBase64}`;
        const imageTwoSrc = `data:image/jpeg;base64,${imageTwoBase64}`;
        console.log(imageOneSrc);

        $('#lbl_fs_name').text(name);
        $('#lbl_fs_location').text(location);

        $('#img_fs_imageOne').attr('src', imageOneSrc).show();
        $('#img_fs_imageTwo').attr('src', imageTwoSrc).show();
        getFieldStaffData();
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function selectStaffId() {
  $.ajax({  
    url: 'http://localhost:8080/greenshadow/staff',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const dropDown = $('#sel_fs_staffId');
      dropDown.empty();
      dropDown.append(`<option value="" selected disabled>Select Staff</option>`);
      data.data.forEach(data => {
          const option = `<option
          data-staffId="${data.staffId}"
          data-firstName="${data.firstName}"
          data-lastName="${data.lastName}"
          data-designation="${data.designation}"
          data-role="${data.role}"
          value="${data.staffId}">${data.staffId} ${data.firstName} ${data.lastName}</option>`;
          dropDown.append(option);
        });
      $('#sel_fs_staffId').on('change', function() {
        const selectedOption = $(this).find(':selected');
        const firstName = selectedOption.attr('data-firstName');
        const lastName = selectedOption.attr('data-lastName');
        const designation = selectedOption.attr('data-designation');
        const role = selectedOption.attr('data-role');
        $('#lbl_fs_staffId').text(selectedOption.val());
        $('#lbl_fs_firstName').text(firstName);
        $('#lbl_fs_lastName').text(lastName);
        $('#lbl_fs_designation').text(designation);
        $('#lbl_fs_role').text(role);
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

$('#btn_fs_add').on('click', function() {
  const confirmation = confirm('Are you sure you want to add this staff to this field?');
  if (confirmation) {
    const fieldCode = $('#sel_fs_fieldCode').val();
  const staffId = $('#sel_fs_staffId').val();
  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff/fieldstaff',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ fieldCode: fieldCode, staffId: staffId }),
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      alert('Staff ' + staffId + ' added to ' +  fieldCode + ' field successfully');
      getFieldStaffData();
    },  
    error: function(error) {
      alert(error.responseText);
    }
  });
  }
});

function getFieldStaffData() {
  const fieldCode = $('#sel_fs_fieldCode').val();
  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff/fieldstaff/' + fieldCode,
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const tableBody = $('#tbody_fs_fieldstaff');
      tableBody.empty();
      if (data.data.length === 0) {
        tableBody.append('<tr><td colspan="7" class="text-center">No staff found for this field</td></tr>');
        return;
      }
      data.data.forEach(data => {
        const row = `<tr>
                      <td>${fieldCode}</td>
                      <td>${data.staffId}</td>
                      <td>${data.firstName}</td>
                      <td>${data.lastName}</td>
                      <td>${data.designation}</td>
                      <td>${data.role}</td>
                      <td><button type="button" class="btn btn-danger btn-delete" data-field-code="${fieldCode}" data-staff-id="${data.staffId}">Delete</button></td>
                    </tr>`;
        tableBody.append(row);
      });
      $('.btn-delete').on('click', function() {
        const fieldCode = $(this).attr('data-field-code');
        const staffId = $(this).attr('data-staff-id');
        console.log(fieldCode, staffId);
        deleteFieldStaff(fieldCode, staffId);
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function deleteFieldStaff(fieldCode, staffId) {
  console.log(fieldCode, staffId);
  const confirmation = confirm('Are you sure you want to delete this staff ' + staffId + ' from this ' + fieldCode + ' field?');
  if (confirmation) {
    $.ajax({
      url: 'http://localhost:8080/greenshadow/staff/fieldstaff',
      data: { fieldCode: fieldCode, staffId: staffId },
      type: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function(data) {
        alert('Staff ' + staffId + ' deleted from ' + fieldCode + ' field successfully');
        getFieldStaffData();
      },
      error: function(error) {
        alert(error.responseText);
      }
    });
  }
}

