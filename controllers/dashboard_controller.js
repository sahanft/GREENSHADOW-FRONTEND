
const ctx = document.getElementById('logChart').getContext('2d');
const logChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 
            'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [{
            label: 'Log Count',
            data: [50, 60, 40, 70, 55, 70, 85, 40, 57, 30, 45, 60],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max : 100
            }
        }
    }
});