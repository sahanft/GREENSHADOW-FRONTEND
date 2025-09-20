$(document).ready(function() {
  $('#slidebar').hide();
  $('#login').show();
  $('#sec_vehicle').hide();
  $('#sec_equipment').hide();
  $('#sec_crop').hide();
  $('#sec_staff').hide();
  $('#sec_field_crops').hide();
  $('#sec_field_staff').hide();
  $('#sec_log').hide();
  $('#sec_field').hide();
  $('#sec_previous_logs').hide();
  $('#sec_dashboard').show();
  $('#sec_users').hide();
})

$('#nav_field_details').on('click', function() {
  $('#sec_vehicle').hide();
  $('#sec_equipment').hide();
  $('#sec_crop').hide();
  $('#sec_staff').hide();
  $('#sec_field_crops').hide();
  $('#sec_field_staff').hide();
  $('#sec_log').hide();
  $('#sec_previous_logs').hide();
  $('#sec_field').show();
  $('#sec_dashboard').hide();
  $('#sec_users').hide();
  loadFieldCodeToModel();
  loadFieldDetailsTable();
});

$('#nav_field_crops').on('click', function() {
  $('#sec_vehicle').hide();
  $('#sec_equipment').hide();
  $('#sec_crop').hide();
  $('#sec_staff').hide();
  $('#sec_field_crops').show();
  $('#sec_field_staff').hide();
  $('#sec_log').hide();
  $('#sec_field').hide();
  $('#sec_previous_logs').hide();
  $('#sec_dashboard').hide();
  $('#sec_users').hide();
  selectFieldCode();
  selectCropCode();
});

$('#nav_field_staff').on('click', function() {
  $('#sec_vehicle').hide();
  $('#sec_equipment').hide();
  $('#sec_crop').hide();
  $('#sec_staff').hide();
  $('#sec_field_crops').hide();
  $('#sec_field_staff').show();
  $('#sec_log').hide();
  $('#sec_field').hide();
  $('#sec_previous_logs').hide();
  $('#sec_dashboard').hide();
  $('#sec_users').hide();
  selectFieldCodeForStaff();
  selectStaffId();
});

$('#nav_crops').on('click', function() {
  $('#sec_vehicle').hide();
  $('#sec_equipment').hide();
  $('#sec_crop').show();
  $('#sec_staff').hide();
  $('#sec_field_crops').hide();
  $('#sec_field_staff').hide();
  $('#sec_log').hide();
  $('#sec_field').hide();
  $('#sec_previous_logs').hide();
  $('#sec_dashboard').hide();
  $('#sec_users').hide();
  loadCropCodeToModel();
  loadCropDetailsTable();
});

$('#nav_staff').on('click', function() {
  $('#sec_vehicle').hide();
  $('#sec_equipment').hide();
  $('#sec_crop').hide();
  $('#sec_staff').show();
  $('#sec_field_crops').hide();
  $('#sec_field_staff').hide();
  $('#sec_log').hide();
  $('#sec_field').hide();
  $('#sec_previous_logs').hide();
  $('#sec_dashboard').hide();
  $('#sec_users').hide();
  loadStaffIdToModel();
  loadStaffDetailsTable();
});

$('#nav_log').on('click', function() {
  $('#sec_vehicle').hide();
  $('#sec_equipment').hide();
  $('#sec_crop').hide();
  $('#sec_staff').hide();
  $('#sec_field_crops').hide();
  $('#sec_field_staff').hide();
  $('#sec_log').show();
  $('#sec_field').hide();
  $('#sec_previous_logs').hide();
  $('#sec_dashboard').hide();
  $('#sec_users').hide();
  loadLogIdToLabel();
  loadDateToLabel();
  setInterval(loadDateToLabel, 1000);
  selectFieldCodeForCreateLog();
  selectCropCodeForCreateLog();
  selectStaffIdForCreateLog();
});

$('#nav_vehicle').on('click', function() {
  $('#sec_vehicle').show();
  $('#sec_equipment').hide();
  $('#sec_crop').hide();
  $('#sec_staff').hide();
  $('#sec_field_crops').hide();
  $('#sec_field_staff').hide();
  $('#sec_log').hide();
  $('#sec_field').hide();
  $('#sec_previous_logs').hide();
  $('#sec_dashboard').hide();
  $('#sec_users').hide();
  loadVehicleIdToModel();
  loadStaffIdsToVehicleModel();
  loadVehicleDetailsTable();
});

$('#nav_equipment').on('click', function() {
  $('#sec_vehicle').hide();
  $('#sec_equipment').show();
  $('#sec_crop').hide();
  $('#sec_staff').hide();
  $('#sec_field_crops').hide();
  $('#sec_field_staff').hide();
  $('#sec_log').hide();
  $('#sec_field').hide();
  $('#sec_previous_logs').hide();
  $('#sec_dashboard').hide();
  $('#sec_users').hide();
  loadEquipmentIdToModal();
  loadStaffIdsToEquipmentModal();
  loadFieldIdsToEquipmentModal();
  loadEquipmentDetailsTable();
});

$('#nav_previous_logs').on('click', function() {
  $('#sec_vehicle').hide();
  $('#sec_equipment').hide();
  $('#sec_crop').hide();
  $('#sec_staff').hide();
  $('#sec_field_crops').hide();
  $('#sec_field_staff').hide();
  $('#sec_log').hide();
  $('#sec_field').hide();
  $('#sec_previous_logs').show();
  $('#sec_dashboard').hide();
  $('#sec_users').hide();
  loadPreviousLogsTable();
});

$('#nav_dashboard').on('click', function() {
  $('#sec_vehicle').hide();
  $('#sec_equipment').hide();
  $('#sec_crop').hide();
  $('#sec_staff').hide();
  $('#sec_field_crops').hide();
  $('#sec_field_staff').hide();
  $('#sec_log').hide();
  $('#sec_field').hide();
  $('#sec_previous_logs').hide();
  $('#sec_dashboard').show();
  $('#sec_users').hide();
});

$('#nav_users').on('click', function() {
  $('#sec_vehicle').hide();
  $('#sec_equipment').hide();
  $('#sec_crop').hide();
  $('#sec_staff').hide();
  $('#sec_field_crops').hide();
  $('#sec_field_staff').hide();
  $('#sec_log').hide();
  $('#sec_field').hide();
  $('#sec_previous_logs').hide();
  $('#sec_dashboard').hide();
  $('#sec_users').show();
  loadUsersTable();
});

$(".nav-link").on("click",function() {
  $(".nav-link").removeClass("active");
  $(this).addClass("active");
});

$('#btnLogin').on('click', function() {
  const email = $('#username').val();
  const password = $('#password').val();
  const user = {email: email, password: password};
  console.log(user);
  $.ajax({
    url: 'http://localhost:8080/greenshadow/auth/signin',
    type: 'POST',
    data: JSON.stringify(user),
    contentType: 'application/json',
    processData: false,
    success: function(response) {
      console.log(response.token);
      localStorage.setItem('token', response.token);
      $('#login').hide();
      $('#sec_vehicle').hide();
      $('#sec_equipment').hide();
      $('#sec_crop').hide();
      $('#sec_staff').hide();
      $('#sec_field_crops').hide();
      $('#sec_field_staff').hide();
      $('#sec_log').hide();
      $('#sec_field').hide();
      $('#sec_previous_logs').hide();
      $('#sec_dashboard').show();
      $('#slidebar').show();
      $("body").css("overflow", "auto");
    },
    error: function(error) {
      console.log(error);
      alert(error.responseText);
    }
  })
});


