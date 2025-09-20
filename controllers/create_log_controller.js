$(document).ready(function() {
  // loadLogIdToLabel();
  // loadDateToLabel();
  // setInterval(loadDateToLabel, 1000);
  // selectFieldCodeForCreateLog();
  // selectCropCodeForCreateLog();
  // selectStaffIdForCreateLog();
});

function loadLogIdToLabel() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/log/nextcode',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      $('#lbl_cl_logCode').text(data.data);
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function loadDateToLabel() {
  var now = new Date();
  var date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  $('#lbl_cl_date').text(date);
  console.log(date);
}

function selectFieldCodeForCreateLog() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/field',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const dropDown = $('#sel_cl_fieldCode');
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

      $('#sel_cl_fieldCode').on('change', function() {
        const selectedOption = $(this).find(':selected');
        const name = selectedOption.data('name');
        const location = selectedOption.data('location');
        const imageOneBase64 = selectedOption.attr('data-imageOne');
        const imageTwoBase64 = selectedOption.attr('data-imageTwo');

        const imageOneSrc = `data:image/jpeg;base64,${imageOneBase64}`;
        const imageTwoSrc = `data:image/jpeg;base64,${imageTwoBase64}`;

        $('#lbl_cl_name').text(name);
        $('#lbl_cl_location').text(location);

        $('#img_cl_imageOne').attr('src', imageOneSrc).show();
        $('#img_cl_imageTwo').attr('src', imageTwoSrc).show();
      });

      $('#btn_cl_field_add').on('click', function() {
        const selectedOption = $('#sel_cl_fieldCode').find(':selected');
        if (!selectedOption.val()) {
          alert('Please select a field.');
          return;
        }

        const fieldCode = selectedOption.attr('data-fieldCode');
        const name = selectedOption.data('name');
        const location = selectedOption.data('location');
        const imageOneBase64 = selectedOption.attr('data-imageOne');
        const imageTwoBase64 = selectedOption.attr('data-imageTwo');

        const imageOneSrc = `data:image/jpeg;base64,${imageOneBase64}`;
        const imageTwoSrc = `data:image/jpeg;base64,${imageTwoBase64}`;

        const isDuplicate = $('#tbody_cl_fields tr').filter(function() {
          return $(this).find('td').eq(0).text() === fieldCode;
        }).length > 0;

        if (isDuplicate) {
          alert('This field ' + fieldCode + ' is already added.');
          return;
        }
        const tableRow = `
          <tr>
            <td>${fieldCode}</td>
            <td>${name}</td>
            <td>${location}</td>
            <td><img src="${imageOneSrc}" alt="Image One" width="70"></td>
            <td><img src="${imageTwoSrc}" alt="Image Two" width="70"></td>
            <td><button class="btn btn-danger btn-remove">Remove</button></td>
          </tr>
        `;
        $('#tbody_cl_fields').append(tableRow);
      }); 
      
      $('#tbody_cl_fields').on('click', '.btn-remove', function() {
        $(this).closest('tr').remove();
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function selectCropCodeForCreateLog() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/crop',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const dropDown = $('#sel_cl_cropCode');
      dropDown.empty();
      dropDown.append(`<option value="" selected disabled>Select Crop</option>`);
      data.data.forEach(data => {
        const option = `<option 
        data-cropCode="${data.cropCode}"
        data-commonName="${data.commonName}"
        data-scientificName="${data.scientificName}"
        data-category="${data.category}"
        data-season="${data.season}"
        data-image="${data.image}"
        value="${data.cropCode}">${data.cropCode} ${data.commonName} ${data.scientificName}</option>`;
        dropDown.append(option);
      });

      $('#sel_cl_cropCode').on('change', function() {
        const selectedOption = $(this).find(':selected');
        const commonName = selectedOption.attr('data-commonName');
        const scientificName = selectedOption.attr('data-scientificName');
        const category = selectedOption.data('category');
        const season = selectedOption.data('season');
        const imageBase64 = selectedOption.attr('data-image');

        const imageSrc = `data:image/jpeg;base64,${imageBase64}`;

        $('#lbl_cl_commonName').text(commonName);
        $('#lbl_cl_scientificName').text(scientificName);
        $('#lbl_cl_category').text(category);
        $('#lbl_cl_season').text(season);

        $('#img_cl_image').attr('src', imageSrc).show();
      });

      $('#btn_cl_add_crop').on('click', function() {
        const selectedOption = $('#sel_cl_cropCode').find(':selected');
        if (!selectedOption.val()) {
          alert('Please select a crop.');
          return;
        }

        const cropCode = selectedOption.attr('data-cropCode');
        const commonName = selectedOption.attr('data-commonName');
        const scientificName = selectedOption.attr('data-scientificName');
        const category = selectedOption.data('category');
        const season = selectedOption.data('season');
        const imageBase64 = selectedOption.attr('data-image');

        const imageSrc = `data:image/jpeg;base64,${imageBase64}`;

        const isDuplicate = $('#tbody_cl_crops tr').filter(function() {
          return $(this).find('td').eq(0).text() === cropCode;
        }).length > 0;

        if (isDuplicate) {
          alert('This crop ' + cropCode + ' is already added.');
          return;
        }
        const tableRow = `
          <tr>
            <td>${cropCode}</td>
            <td>${commonName}</td>
            <td>${scientificName}</td>
            <td>${category}</td>
            <td>${season}</td>
            <td><img src="${imageSrc}" alt="Image" width="70"></td>
            <td><button class="btn btn-danger btn-remove">Remove</button></td>
          </tr>
        `;

        $('#tbody_cl_crops').append(tableRow);
      });

      $('#tbody_cl_crops').on('click', '.btn-remove', function() {
        $(this).closest('tr').remove();
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function selectStaffIdForCreateLog() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/staff',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const dropDown = $('#sel_cl_staffId');
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

      $('#sel_cl_staffId').on('change', function() {
        const selectedOption = $(this).find(':selected');
        const firstName = selectedOption.attr('data-firstName');
        const lastName = selectedOption.attr('data-lastName');
        const designation = selectedOption.attr('data-designation');
        const role = selectedOption.attr('data-role');
        $('#lbl_cl_staffId').text(selectedOption.val());
        $('#lbl_cl_firstName').text(firstName);
        $('#lbl_cl_lastName').text(lastName);
        $('#lbl_cl_designation').text(designation);
        $('#lbl_cl_role').text(role);
      });

      $('#btn_cl_add_staff').on('click', function() {
        const selectedOption = $('#sel_cl_staffId').find(':selected');
        if (!selectedOption.val()) {
          alert('Please select a staff.');
          return;
        }

        const staffId = selectedOption.attr('data-staffId');
        const firstName = selectedOption.attr('data-firstName');
        const lastName = selectedOption.attr('data-lastName');
        const designation = selectedOption.attr('data-designation');
        const role = selectedOption.attr('data-role');

        const isDuplicate = $('#tbody_cl_staff tr').filter(function() {
          return $(this).find('td').eq(0).text() === staffId;
        }).length > 0;

        if (isDuplicate) {
          alert('This staff ' + staffId + ' is already added.');
          return;
        }
        const tableRow = `
          <tr>
            <td>${staffId}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${designation}</td>
            <td>${role}</td>
            <td><button class="btn btn-danger btn-remove">Remove</button></td>
          </tr>
        `;

        $('#tbody_cl_staff').append(tableRow);
      });

      $('#tbody_cl_staff').on('click', '.btn-remove', function() {
        $(this).closest('tr').remove();
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

$('#btn_cl_create_log').on('click', function() {
  const confirmation = confirm('Are you sure you want to create this log?');
  if (confirmation) {
    const fieldCodes = [];
    const cropCodes = [];
    const staffIds = [];
    const logCode = $('#lbl_cl_logCode').text();
    const date = $('#lbl_cl_date').text();
    const image = $('#in_cl_image')[0].files[0];
    const observation = $('#t-area-observation').val();
    
    $('#tbody_cl_fields tr').each(function() {
      fieldCodes.push($(this).find('td').eq(0).text());
    });
  
    $('#tbody_cl_crops tr').each(function() {
      cropCodes.push($(this).find('td').eq(0).text());
    });
  
    $('#tbody_cl_staff tr').each(function() {
      staffIds.push($(this).find('td').eq(0).text());
    });

    if (fieldCodes.length === 0 || cropCodes.length === 0 || staffIds.length === 0) {
      alert('Please add at least one field, crop, and staff to the log.');
      return;
    }

    const formData = new FormData();
    formData.append('logCode', logCode);
    formData.append('date', date);
    formData.append('logFields', fieldCodes);
    formData.append('logCrops', cropCodes);
    formData.append('logStaff', staffIds);
    formData.append('image', image);
    formData.append('details', observation);
  
    $.ajax({
      url: 'http://localhost:8080/greenshadow/log',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function(data) {
        alert("Log created successfully.");
        resetLogForm();
        loadPreviousLogsTable();
      },
      error: function(error) {
        alert(error.responseText);
      }
    });
  }
})

function resetLogForm() {
  loadLogIdToLabel();
      $('#tbody_cl_fields').empty();
      $('#tbody_cl_crops').empty();
      $('#tbody_cl_staff').empty();
      $('#t-area-observation').val('');
      $('#in_cl_image').val('');
      $('#sel_cl_fieldCode').val('');
      $('#sel_cl_cropCode').val('');
      $('#sel_cl_staffId').val('');
      $('#lbl_cl_fieldId').text('');
      $('#lbl_cl_cropId').text('');
      $('#lbl_cl_staffId').text('');
      $('#lbl_cl_firstName').text('');
      $('#lbl_cl_lastName').text('');
      $('#lbl_cl_designation').text('');
      $('#lbl_cl_role').text('');
      $('#lbl_cl_commonName').text('');
      $('#lbl_cl_scientificName').text('');
      $('#lbl_cl_category').text('');
      $('#lbl_cl_season').text('');
      $('#img_cl_image_observation').attr('src', '');
      $('#img_cl_imageOne').attr('src', '');
      $('#img_cl_imageTwo').attr('src', '');
      $('#img_cl_image').attr('src', '');
      $('#lbl_cl_name').text('');
      $('#lbl_cl_location').text('');
      $('tbody_cl_fields').empty();
      $('tbody_cl_crops').empty();
      $('tbody_cl_staff').empty();
}