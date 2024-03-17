import React from 'react';
import ReactApexChart from 'react-apexcharts';

function Stats() {
  // Sample data for charts
  const lineChartData = {
    series: [{
      name: 'Series 1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Line Chart',
        align: 'left'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
  };

  const barChartData = {
    series: [{
      data: [44, 55, 41, 64, 22, 43, 21]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G'],
      }
    },
  };

  const pieChartData = {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };

  return (
    <div className="mx-16 sm:mx-8 md:mx-16 mb-10 mt-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Stats</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-lg font-semibold mb-2">Line Chart</h2>
          <ReactApexChart options={lineChartData.options} series={lineChartData.series} type="line" height={350} />
        </div>
        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-lg font-semibold mb-2">Bar Chart</h2>
          <ReactApexChart options={barChartData.options} series={barChartData.series} type="bar" height={350} />
        </div>
        {/* Pie Chart */}
        <div className="col-span-2 bg-white shadow-md rounded-md p-6">
          <h2 className="text-lg font-semibold mb-2">Pie Chart</h2>
          <ReactApexChart options={pieChartData.options} series={pieChartData.series} type="pie" />
        </div>
      </div>
    </div>
  );
}

export default Stats;
