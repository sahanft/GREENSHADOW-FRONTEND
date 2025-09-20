$(document).ready(function() {
  // loadFieldCodeToModel();
  // loadFieldDetailsTable();
});

function previewImage(input, previewId) {
  if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
          const preview = document.querySelector(previewId);
          preview.src = e.target.result; 
          preview.style.display = 'block';
      };
      reader.readAsDataURL(input.files[0]);
  }
}

function loadFieldCodeToModel() {
  $.ajax({
      url: 'http://localhost:8080/greenshadow/field/nextcode',
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function (data) {
          $('#code_model_field').text(data.data);
      },
      error: function (error) {
          alert(error.responseText);
      }
  });
}

$('#btn_save_field').click(function() {
  console.log("save");
  const formData = new FormData();
  formData.append('fieldCode', $('#code_model_field').text());
  formData.append('name', $('#name_model_field').val());
  formData.append('location', $('#location_model_field').val());
  formData.append('size', $('#size_model_field').val());
  const imageOneFile = $('#imageOne_model_field')[0].files[0];
  if (imageOneFile) {
      formData.append('imageOne', imageOneFile);
  }
  const imageTwoFile = $('#imageTwo_model_field')[0].files[0];
  if (imageTwoFile) {
      formData.append('imageTwo', imageTwoFile);
  }

    $.ajax({
      url: 'http://localhost:8080/greenshadow/field',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function(data) {
          alert("Field saved successfully!");
          loadFieldCodeToModel();
          $('#model_field').modal('hide');
          $('#name_model_field').val('');
          $('#location_model_field').val('');
          $('#size_model_field').val('');
          $('#imageOne_model_field').val('');
          $('#imageTwo_model_field').val('');
          $('#imageOnePreview_model_field').attr('src', '');
          $('#imageTwoPreview_model_field').attr('src', '');
          $('#imageOnePreview_model_field').hide();
          $('#imageTwoPreview_model_field').hide();       
          loadFieldDetailsTable();   
      },
      error: function(error) {
          alert(error.responseText);
      }
  });
});

function loadFieldDetailsTable() {
  $.ajax({
      url: 'http://localhost:8080/greenshadow/field',
      type: 'GET',
      dataType: 'json',
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function(data) {
          console.log(data);
          const tableBody = $('#field_details_Table_Body');
          tableBody.empty();
          data.data.forEach(data => {
              const row = `
                   <tr>
                      <td>${data.fieldCode}</td>
                      <td>${data.name}</td>
                      <td>${data.location}</td>
                      <td>${data.size}</td>
                      <td><img src="data:image/jpeg;base64,${data.imageOne}" alt="Image 1" class="image-container"></td>
                      <td><img src="data:image/jpeg;base64,${data.imageTwo}" alt="Image 2" class="image-container"></td>
                      
                      <td><button type="button" class="btn btn-primary btn-update" data-bs-toggle="modal" data-bs-target="#modal_field_update"
                      data-field-code="${data.fieldCode}"
                      data-field-name="${data.name}"
                      data-field-location="${data.location}"
                      data-field-size="${data.size}"
                      data-field-imageone="data:image/jpeg;base64,${data.imageOne}"
                      data-field-imagetwo="data:image/jpeg;base64,${data.imageTwo}"
                      >Update</button></td>
                      
                      <td><button type="button" class="btn btn-danger btn-delete" data-field-code="${data.fieldCode}">Delete</button></td>
                  </tr>
              `;
              tableBody.append(row);
          });

          $('.btn-delete').on('click', function() {
            const fieldCode = $(this).data('field-code');
            deleteField(fieldCode);
        });

          $('.btn-update').on('click', function() {
            const fieldCode = $(this).data('field-code');
            loadUpdateModal(fieldCode);
          });
      },
      error: function(error) {
          alert(error.responseText);
      }
  });
};

function deleteField(fieldCode) {
  const confirmed = confirm('Are you sure you want to delete this field? : '+ fieldCode);
  if (confirmed) {
    $.ajax({
      url: 'http://localhost:8080/greenshadow/field/' + fieldCode,
      type: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function(data) {
        loadFieldDetailsTable();
        loadFieldCodeToModel();
        alert(fieldCode + " : Field deleted successfully!");
      },
      error: function(error) {
        alert(error.responseText);
      }
    });
  }
}

function loadUpdateModal(fieldCode) {
  $.ajax({
      url: 'http://localhost:8080/greenshadow/field/' + fieldCode,
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function(data) {
          $('#code_model_field_update').text(data.data.fieldCode);
          $('#name_model_field_update').val(data.data.name);
          $('#location_model_field_update').val(data.data.location);
          $('#size_model_field_update').val(data.data.size);
          const imageOneBase64 = data.data.imageOne;
          const imageTwoBase64 = data.data.imageTwo;
          $('#existingImage1').attr('value', imageOneBase64);
          $('#existingImage2').attr('value', imageTwoBase64); 
          $('#imageOnePreview_model_field_update').attr('src', 'data:image/png;base64,' + imageOneBase64).show();
          $('#imageTwoPreview_model_field_update').attr('src', 'data:image/png;base64,' + imageTwoBase64).show();
      },
      error: function(error) {
          alert(error.responseText);
      }
  });
}

$('#btn_update_field').on('click', function() {
  const fieldCode = $('#code_model_field_update').text();
  const formData = new FormData();
  formData.append('fieldCode', fieldCode);
  formData.append('name', $('#name_model_field_update').val());
  formData.append('location', $('#location_model_field_update').val());
  formData.append('size', $('#size_model_field_update').val());
  const imageOneFile = $('#imageOne_model_field_update')[0].files[0];
  const base64StringImage1 = $('#existingImage1').attr('value');
  const base64StringImage2 = $('#existingImage2').attr('value');

  if (imageOneFile) {
      formData.append('imageOne', imageOneFile);
  } else {
      formData.append('imageOne', convertBase64StringToFile(base64StringImage1));
  }
  const imageTwoFile = $('#imageTwo_model_field_update')[0].files[0];
  if (imageTwoFile) {
      formData.append('imageTwo', imageTwoFile);
  } else {
      formData.append('imageTwo', convertBase64StringToFile(base64StringImage2));
  }

  $.ajax({
      url: 'http://localhost:8080/greenshadow/field',
      type: 'PUT',
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function(data) {
          alert("Field updated successfully!");
          $('#name_model_field_update').val('');
          $('#location_model_field_update').val('');
          $('#size_model_field_update').val('');
          $('#imageOne_model_field_update').val('');
          $('#imageTwo_model_field_update').val('');
          $('#imageOnePreview_model_field_update').attr('src', '');
          $('#imageTwoPreview_model_field_update').attr('src', '');
          $('#imageOnePreview_model_field_update').hide();
          $('#imageTwoPreview_model_field_update').hide(); 
          $('#modal_field_update').modal('hide');  
          loadFieldDetailsTable();   
      },
      error: function(error) {
          alert(error.responseText);
      }
  });
});

function convertBase64StringToFile(base64String) {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: 'image/jpeg' });
  const file = new File([blob], "imageOne.jpg", { type: 'image/jpeg' });
  return file;
}