import { Chart } from "chart.js/auto";
import ZoomPlugin from "chartjs-plugin-zoom";
import { useEffect, useRef } from "react";

Chart.register(ZoomPlugin);

interface ScatterProps {
  data: { x: number; y: number }[];
  labels: string[];
}

export function Scatter(props: ScatterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart>();
  useEffect(() => {
    if (!canvasRef.current || chartRef.current) {
      return;
    }

    const chart = new Chart(canvasRef.current, {
      type: "scatter",
      data: {
        datasets: [
          {
            data: props.data,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = props.labels[context.dataIndex];
                return label;
              },
            },
          },
          zoom: {
            // Container for pan options
            pan: {
              // Boolean to enable panning
              enabled: true,
              mode: "xy",
            },

            // Container for zoom options
            zoom: {
              wheel: {
                enabled: true,
              },
              mode: "xy",
            },
          },
        },
      },
    });
    chartRef.current = chart;
  });

  return <canvas ref={canvasRef}></canvas>;
}
