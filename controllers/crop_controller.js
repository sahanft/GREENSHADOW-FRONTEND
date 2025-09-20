$(document).ready(function() {
  // loadCropCodeToModel();
  // loadCropDetailsTable();
})

function loadCropCodeToModel() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/crop/nextcode',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      $("#code_modal_crop").text(data.data);
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
} 

$("#btn_save_crop").click(function() {
 const formData = new FormData();
 formData.append('cropCode', $('#code_modal_crop').text());
 formData.append('commonName', $('#commonName_modal_crop').val());
 formData.append('scientificName', $('#scientificName_modal_crop').val());
 formData.append('category', $('#category_modal_crop').val());
 formData.append('season', $('#season_modal_crop').val());
 formData.append('image', $('#image_modal_crop')[0].files[0]);

 $.ajax({
   url: 'http://localhost:8080/greenshadow/crop',
   type: 'POST',
   data: formData,
   contentType: false,
   processData: false,
   headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
   },
   success: function(data) {
     alert("Crop added successfully");
     $('#commonName_modal_crop').val('');
     $('#scientificName_modal_crop').val('');
     $('#category_modal_crop').val('');
     $('#season_modal_crop').val('');
     $('#image_modal_crop').val('');
     $('#imagePreview_modal_crop').attr('src', '').hide();
     $('#imagePreview_modal_crop').hide();
     $('#modal_crop').modal('hide');
     loadCropCodeToModel();
     loadCropDetailsTable();
   },
   error: function(error) {
     alert(error.responseText);
   }
 });
 
})

function loadCropDetailsTable() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/crop',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const tableBody = $('#crop_details_table_body');
      tableBody.empty();
      data.data.forEach(data => {
        const row = `
          <tr>
            <td>${data.cropCode}</td>
            <td>${data.commonName}</td>
            <td>${data.scientificName}</td>
            <td>${data.category}</td>
            <td>${data.season}</td>
            <td><img src="data:image/jpeg;base64,${data.image}" alt="Image" class="image-container"></td>
            <td><button type="button" class="btn btn-primary btn-update-crop" data-bs-toggle="modal" data-bs-target="#modal_crop_update"
            data-crop-code="${data.cropCode}"
            data-common-name="${data.commonName}"
            data-scientific-name="${data.scientificName}"
            data-category="${data.category}"
            data-season="${data.season}"
            data-image="data:image/jpeg;base64,${data.image}"
            >Update</button></td>
            <td><button type="button" class="btn btn-danger btn-delete-crop" data-crop-code="${data.cropCode}">Delete</button></td>
          </tr>
        `;
        tableBody.append(row);
      });

      $('.btn-delete-crop').on('click', function() {
        const cropCode = $(this).data('crop-code');
        deleteCrop(cropCode);
      });

      $('.btn-update-crop').on('click', function() {
        const cropCode = $(this).data('crop-code');
        loadUpdateCropModal(cropCode);
      });
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

function deleteCrop(cropCode) {
  const confirmed = confirm('Are you sure you want to delete this crop? : ' + cropCode);
  if (confirmed) {
    $.ajax({
      url: 'http://localhost:8080/greenshadow/crop/' + cropCode,
      type: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function(data) {
        loadCropDetailsTable();
        loadCropCodeToModel();
        alert(cropCode + " : Crop deleted successfully!");
      },
      error: function(error) {
        alert(error.responseText);
      }
    });
  }
}

function loadUpdateCropModal(cropCode) {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/crop/' + cropCode,
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      $('#code_modal_crop_update').text(data.data.cropCode);
      $('#commonName_modal_crop_update').val(data.data.commonName);
      $('#scientificName_modal_crop_update').val(data.data.scientificName);
      $('#category_modal_crop_update').val(data.data.category);
      $('#season_modal_crop_update').val(data.data.season);
      const imageBase64 = data.data.image;
      $('#existing_image_crop').attr('value', imageBase64);
      $('#imagePreview_modal_crop_update').attr('src', 'data:image/jpeg;base64,' + imageBase64).show();
      $('#modal_crop_update').modal('show');
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
}

$('#btn_update_crop').on('click', function() {
  const formData = new FormData();
  formData.append('cropCode', $('#code_modal_crop_update').text());
  formData.append('commonName', $('#commonName_modal_crop_update').val());
  formData.append('scientificName', $('#scientificName_modal_crop_update').val());
  formData.append('category', $('#category_modal_crop_update').val());
  formData.append('season', $('#season_modal_crop_update').val());
  const image = $('#image_modal_crop_update')[0].files[0]; formData.append('image', $('#image_modal_crop_update')[0].files[0]);
  const existingImage = $('#existing_image_crop').attr('value');
  if (image) {
    formData.append('image', image);
  } else {
    formData.append('image', convertBase64StringToFile(existingImage));
  }

  $.ajax({
    url: 'http://localhost:8080/greenshadow/crop',
    type: 'PUT',  
    data: formData,     
    contentType: false,             
    processData: false,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },     
    success: function(data) {
      alert("Crop updated successfully");
      $('#commonName_modal_crop_update').val('');
      $('#scientificName_modal_crop_update').val('');
      $('#category_modal_crop_update').val('');
      $('#season_modal_crop_update').val('');
      $('#image_modal_crop_update').val('');
      $('#imagePreview_modal_crop_update').attr('src', '').hide();
      $('#modal_crop_update').modal('hide');
      loadCropCodeToModel();
      loadCropDetailsTable();
    },
    error: function(error) {
      alert(error.responseText);
    }
  });
});
  