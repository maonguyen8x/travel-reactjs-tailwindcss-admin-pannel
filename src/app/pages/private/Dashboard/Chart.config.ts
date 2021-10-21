import { COLORS } from 'app/constants';
import { Chart } from 'chart.js';

interface IConfigChart {
  dataDefault: any;
  maxNumber: number;
  stepSizeNumber: number;
  label: any;
  color?: any;
  type?: string;
}

export const getConfigChart = ({
  dataDefault,
  maxNumber,
  stepSizeNumber,
  label,
  color = Chart.helpers.color(COLORS.CARD_DEFAULT).alpha(0.6).rgbString(),
  type,
}: IConfigChart) => ({
  type: type,
  data: {
    labels: label,
    datasets: [
      {
        label: '',
        backgroundColor: color,
        borderColor: COLORS.BACKGROUND_VIEW,
        pointHoverBorderWidth: 12,
        pointBackgroundColor: Chart.helpers
          .color(COLORS.CARD_ACTIVE)
          .alpha(0.5)
          .rgbString(),
        pointBorderColor: Chart.helpers
          .color(COLORS.CARD_ACTIVE)
          .alpha(1)
          .rgbString(),

        pointHoverBorderColor: Chart.helpers
          .color(COLORS.CARD_ACTIVE)
          .alpha(1)
          .rgbString(),
        fill: true,
        data: dataDefault,
      },
    ],
  },
  ...(type !== 'pie' && {
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: false,
      scales: {
        xAxes: [
          {
            categoryPercentage: 0.35,
            barPercentage: 0.7,
            display: true,
            scaleLabel: {
              display: false,
              labelString: 'Month',
            },
            gridLines: {
              color: '#1E9AE9',
              drawBorder: true,
              offsetGridLines: type === 'bar' && true,
              drawTicks: true,
              borderDash: [3, 4],
              zeroLineWidth: 1,
              zeroLineColor: '#1E9AE9',
              zeroLineBorderDash: [3, 4],
            },
            ticks: {
              display: true,
              beginAtZero: true,
              fontColor: '#1E9AE9',
              fontSize: 13,
              padding: 10,
            },
          },
        ],
        yAxes: [
          {
            categoryPercentage: 0.35,
            barPercentage: 0.7,
            display: true,
            scaleLabel: {
              display: false,
              labelString: 'Value',
            },
            gridLines: {
              color: '#1E9AE9',
              drawBorder: true,
              offsetGridLines: false,
              drawTicks: true,
              borderDash: [3, 4],
              zeroLineWidth: 1,
              zeroLineColor: '#1E9AE9',
              zeroLineBorderDash: [3, 4],
            },
            ticks: {
              max: maxNumber,
              stepSize: stepSizeNumber,
              display: true,
              beginAtZero: true,
              fontColor: '#1E9AE9',
              fontSize: 13,
              padding: 10,
            },
          },
        ],
      },
      title: {
        display: false,
      },
      hover: {
        mode: 'ErrorsPage.js',
      },
      tooltips: {
        enabled: true,
        intersect: false,
        mode: 'nearest',
        bodySpacing: 5,
        yPadding: 10,
        xPadding: 10,
        caretPadding: 0,
        displayColors: false,
        backgroundColor: '#007bff',
        titleFontColor: '#ffffff',
        cornerRadius: 4,
        footerSpacing: 0,
        titleSpacing: 0,
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 5,
          bottom: 0,
        },
      },
    },
  }),
});

export const TIMES = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];

export const MONTH = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
];
