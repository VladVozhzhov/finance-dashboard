import { useState, useContext, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import FloatingLabelInput from "../../components/FloatingLabelInput";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { DataContext } from '../../context/DataContext';
import { FaTrashAlt } from 'react-icons/fa';

const REMAINDER_COLOR = "#d3d3d3";

const Chart = () => {
  const {
    chart: chartItems,
    total,
    fetchError,
    refetchChart,
    setTotal
  } = useContext(DataContext);

  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({ pieName: "", value: "", bgColor: "", textColor: "" });
  const [totalData, setTotalData] = useState("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    refetchChart();
  }, []);

  const sumValues = chartItems.reduce((acc, item) => acc + item.value, 0);
  const pieData = [...chartItems];

  if (total > sumValues) {
    pieData.push({
      name: "Remaining",
      value: total - sumValues,
      bgColor: REMAINDER_COLOR,
      textColor: "#333",
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTotalChange = (e) => {
    setTotalData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bg = formData.bgColor.startsWith('#') ? formData.bgColor : `#${formData.bgColor}`;
      const tc = formData.textColor.startsWith('#') ? formData.textColor : `#${formData.textColor}`;

      await axiosPrivate.post("/users/chart", {
        name: formData.pieName,
        value: parseFloat(formData.value),
        bgColor: bg,
        textColor: tc,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setFormData({ pieName: "", value: "", bgColor: "", textColor: "" });
    }
  };

  const handleTotalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.patch("/users/chart/total", {
        total: parseFloat(totalData),
      });
      setTotal(response.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setTotalData("");
    }
  };

  const handleDelete = async (itemName) => {
    try {
      await axiosPrivate.delete(`/users/chart/${encodeURIComponent(itemName)}`);
    } catch (err) {
      console.error(err);
    }
  };

  const onLegendClick = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-[#ececec] dark:bg-[#242526] pr-2 py-2 rounded-lg lg:grid lg:grid-cols-2" id="chart">
      <div>
        {/* Add New Slice */}
        <form onSubmit={(e) => handleSubmit(e)} className="p-2 flex gap-2 flex-col bg-[#e1e1e1] dark:bg-[#1b1b1b] rounded-lg ml-2 mb-3">
          <h2 className="dark:text-[#d0d0d0] font-bold text-xl md:text-3xl ml-2 mb-2">New Chart Value</h2>
          {['pieName', 'value', 'bgColor', 'textColor'].map((field) => (
            <FloatingLabelInput
              key={field}
              type={field === 'value' ? 'number' : 'text'}
              placeholder={
                field === 'pieName' ? 'Pie name'
                : field === 'bgColor' ? 'Background color (hex, include #)'
                : field === 'textColor' ? 'Text color (hex, include #)'
                : `Pie value`}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              style="chart-input-style"
              focusStyle="chart-focus-style"
              noFocusStyle="chart-nofocus-style"
              inputStyle="chart-input"
            />
          ))}
          <button className="bg-green-600 dark:bg-green-800 hover:bg-green-700 hover:dark:bg-green-900 text-white md:text-xl py-2 md:py-3 rounded-lg">
            Submit
          </button>
        </form>

        {/* Change Total */}
        <form onSubmit={(e) => handleTotalSubmit(e)} className="p-2 flex gap-2 flex-col bg-[#e1e1e1] dark:bg-[#1b1b1b] rounded-lg ml-2 mb-3">
          <h2 className="dark:text-[#d0d0d0] font-bold text-xl md:text-3xl ml-2 mb-2">Change Total</h2>
          <FloatingLabelInput
            type="number"
            placeholder="New total value"
            name="totalValue"
            value={totalData}
            onChange={handleTotalChange}
            style="chart-input-style"
            focusStyle="chart-focus-style"
            noFocusStyle="chart-nofocus-style"
            inputStyle="chart-input"
          />
          <button className="bg-green-600 dark:bg-green-800 hover:bg-green-700 hover:dark:bg-green-900 text-white md:text-xl py-2 md:py-3 rounded-lg">
            Submit
          </button>
        </form>
      </div>
      <div className="lg:h-full">
        {/* Pie and Legend */}
        <div className="flex items-center gap-2 lg:h-full">
          <div className="relative w-60 h-60 md:w-110 md:h-120 lg:w-full lg:h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius="55%"
                  outerRadius="80%"
                  startAngle={90}
                  endAngle={450}
                  isAnimationActive
                  animationDuration={1200}
                >
                  {pieData.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={entry.bgColor}
                      opacity={activeIndex === null || activeIndex === idx ? 1 : 0.2}
                      stroke={activeIndex === idx ? "#000" : "none"}
                      strokeWidth={activeIndex === idx ? 2 : 0}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Total */}
            <div className="absolute inset-0 flex items-center justify-center text-lg md:text-2xl font-bold dark:text-[#d0d0d0]">
              {!fetchError ? total : <p className="text-red-600 text-sm">fetchError</p>}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2 bg-[#e1e1e1] dark:bg-[#1b1b1b] p-2 md:p-4 rounded-lg">
            {pieData.map((entry, idx) => {
              const percent = ((entry.value / total) * 100).toFixed(1);
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2 md:p-4 rounded-lg"
                  style={{
                    backgroundColor: entry.bgColor,
                    color: entry.textColor,
                    opacity: activeIndex === null || activeIndex === idx ? 1 : 0.5,
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <button onClick={() => onLegendClick(idx)} className="flex-1 text-left">
                    <div className="md:text-xl">{entry.name}</div>
                    <div className="text-sm md:text-lg">{entry.value} ({percent}%)</div>
                  </button>
                  {entry.name !== "Remaining" && (
                    <FaTrashAlt
                      className="text-red-500 hover:text-red-600 dark:text-red-600 hover:dark:text-red-700 transition duration-100 font-bold text-lg lg:text-3xl cursor-pointer"
                      onClick={(e) => handleDelete(entry.name, e)}
                      role="button"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
