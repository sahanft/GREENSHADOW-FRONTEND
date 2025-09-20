$(document).ready(function() {
  //loadPreviousLogsTable();
});

function loadPreviousLogsTable() {
  $.ajax({
    url: 'http://localhost:8080/greenshadow/log',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    success: function(data) {
      const tableBody = $('#tbody_previous_logs');
      tableBody.empty();
      data.data.forEach(data => {
        let fieldCodesOptions = '';
        let cropCodesOptions = '';
        let staffIdsOptions = '';
        data.logFields.forEach(field => {
            fieldCodesOptions += `<option>${field.fieldCode}</option>`
        });

        data.logCrops.forEach(crop => {
            cropCodesOptions += `<option>${crop.cropCode}</option>`
        });

        data.logStaff.forEach(staff => {
            staffIdsOptions += `<option>${staff.staffId}</option>`
        });

        const imageBase64 = data.image;
        const imageSrc = `data:image/jpeg;base64,${imageBase64}`;

        const row = `
          <tr>
            <td>${data.logCode}</td>
            <td>${data.date}</td>
            <td><select class="form-select prevent-select">${fieldCodesOptions}</select></td>
            <td><select class="form-select prevent-select">${cropCodesOptions}</select></td>
            <td><select class="form-select prevent-select">${staffIdsOptions}</select></td>
            <td><img src="${imageSrc}" alt="Image" width="70"></td>
            <td>${data.details}</td>
            <td><button type="button" class="btn btn-danger btn-delete-previous-logs" data-log-code="${data.logCode}">Delete</button></td>
          </tr>
        `;
        tableBody.append(row);
      });

      $('.btn-delete-previous-logs').click(function() {
        const logCode = $(this).attr('data-log-code');
        deletePreviousLogs(logCode);
      });
    },
    error: function(error) {
      console.log(error);
    }  
  });
}

function deletePreviousLogs(logCode) {
  confirmation = confirm("Are you sure you want to delete this log?");
  if (confirmation) {
    $.ajax({
      url: 'http://localhost:8080/greenshadow/log/' + logCode,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function(data) {
        loadPreviousLogsTable();
      },
      error: function(error) {
        alert(error.responseText);
      }
    });
  }
}