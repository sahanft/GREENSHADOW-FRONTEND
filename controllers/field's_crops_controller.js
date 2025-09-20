$(document).ready(function() {
  // selectFieldCode();
  // selectCropCode();
});

function selectFieldCode() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/field',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const dropDown = $('#sel_fc_fieldCode');
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

      $('#sel_fc_fieldCode').on('change', function() {
        const selectedOption = $(this).find(':selected');
        const name = selectedOption.data('name');
        const location = selectedOption.data('location');
        const imageOneBase64 = selectedOption.attr('data-imageOne');
        const imageTwoBase64 = selectedOption.attr('data-imageTwo');

        const imageOneSrc = `data:image/jpeg;base64,${imageOneBase64}`;
        const imageTwoSrc = `data:image/jpeg;base64,${imageTwoBase64}`;

        $('#lbl_fc_name').text(name);
        $('#lbl_fc_location').text(location);

        $('#img_fc_imageOne').attr('src', imageOneSrc).show();
        $('#img_fc_imageTwo').attr('src', imageTwoSrc).show();
        getFieldCropsData();
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function selectCropCode() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/crop',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const dropDown = $('#sel_fc_cropCode');
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

      $('#sel_fc_cropCode').on('change', function() {
        const selectedOption = $(this).find(':selected');
        const cropCode = selectedOption.attr('data-cropCode');
        const commonName = selectedOption.attr('data-commonName');
        const scientificName = selectedOption.attr('data-scientificName');
        const category = selectedOption.attr('data-category');
        const season = selectedOption.attr('data-season');
        const imageBase64 = selectedOption.attr('data-image');
        const imageSrc = `data:image/jpeg;base64,${imageBase64}`;

        $('#lbl_fc_cropCode').text(cropCode);
        $('#lbl_fc_commonName').text(commonName);
        $('#lbl_fc_scientificName').text(scientificName);
        $('#lbl_fc_category').text(category);
        $('#lbl_fc_season').text(season);

        $('#img_fc_image').attr('src', imageSrc).show();
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

$('#btn_fc_add').on('click', function() {
  const fieldCode = $('#sel_fc_fieldCode').val();
  const cropCode = $('#sel_fc_cropCode').val();
  const confirmation = confirm('Are you sure you want to add this crop ' + cropCode + ' to ' + 'field ' + fieldCode + '?');
  if (confirmation) {
    $.ajax({
      url: 'http://localhost:8080/greenshadow/field/fieldcrops',
      type: 'POST', 
      contentType: 'application/json',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      data: JSON.stringify({
        fieldCode: fieldCode,
        cropCode: cropCode
      }),
      processData: false,
      success: function(data) {
        getFieldCropsData();
        alert(cropCode + ' crop added to ' + fieldCode + ' field successfully');
      },
      error: function(error) {
        alert(error.responseText);
      }
    });
  }
});

function getFieldCropsData() {
  const fieldCode = $('#sel_fc_fieldCode').val();
  $.ajax({
    url: 'http://localhost:8080/greenshadow/field/fieldcrops/' + fieldCode,
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const fieldCrops = data.data;
      const fieldCropsTableBody = $('#tBody_fc_fieldCrops');
      fieldCropsTableBody.empty();
      if (fieldCrops.length === 0) {
        fieldCropsTableBody.append('<tr><td colspan="7" class="text-center">No crops found for this field</td></tr>');
        return;
      }
      fieldCrops.forEach(fieldCrop => {
        const row = `
          <tr>
            <td>${fieldCode}</td>
            <td>${fieldCrop.cropCode}</td>
            <td>${fieldCrop.commonName}</td>
            <td>${fieldCrop.scientificName}</td>
            <td>${fieldCrop.category}</td>
            <td>${fieldCrop.season}</td>
            <td><button type="button" class="btn btn-danger btn-delete-fieldCrop" data-fieldCode="${fieldCode}" data-cropCode="${fieldCrop.cropCode}">Delete</button></td>
          </tr>
        `;
        fieldCropsTableBody.append(row);
      });
      $('.btn-delete-fieldCrop').click(function() {
        const fieldCode = $(this).attr('data-fieldCode');
        const cropCode = $(this).attr('data-cropCode');
        console.log(fieldCode, cropCode);
        deleteFieldCrop(fieldCode, cropCode);
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function deleteFieldCrop(fieldCode, cropCode) {
  const confirmation = confirm('Are you sure you want to delete this crop ' + cropCode + ' from field ' + fieldCode + '?')
  if (confirmation) {
    $.ajax({
      url: 'http://localhost:8080/greenshadow/field/fieldcrops',
      type: 'DELETE',
      data: {
        fieldCode: fieldCode,
        cropCode: cropCode
      },
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function(data) {
        alert(cropCode + ' crop deleted from ' + fieldCode + ' field successfully');
        getFieldCropsData();
      },
      error: function(error) {
        alert(error.responseText);
      }
    });
  }
}






