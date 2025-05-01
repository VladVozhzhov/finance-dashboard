import { useState, useContext, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import FloatingLabelInput from "../../components/FloatingLabelInput";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { DataContext } from '../../context/DataContext';

const REMAINDER_COLOR = "#d3d3d3";

const Chart = () => {
  const {
    chart: chartItems,
    total,
    fetchError,
    refetchChart,
    setChart,
    setTotal
  } = useContext(DataContext);
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({ pieName: "", value: "", bgColor: "", textColor: "" });
  const [totalData, setTotalData] = useState("");
  const axiosPrivate = useAxiosPrivate();

  // Fetch on mount
  useEffect(() => {
    refetchChart();
  }, []);

  // Prepare data for pie
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
      const bg = formData.bgColor.startsWith('#')
        ? formData.bgColor
        : `#${formData.bgColor}`;
      const tc = formData.textColor.startsWith('#')
        ? formData.textColor
        : `#${formData.textColor}`;
  
      await axiosPrivate.post("/users/chart", {
        name: formData.pieName,
        value: parseFloat(formData.value),
        bgColor: bg,
        textColor: tc,
      });
  
      refetchChart();
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
      refetchChart();
    } catch (err) {
      console.error(err);
    }
  };

  const onLegendClick = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-[#ececec] dark:bg-[#242526] pr-2 py-2 rounded-lg">
      {/* Add New Slice */}
      <form onSubmit={handleSubmit} className="p-2 flex gap-2 flex-col bg-[#e1e1e1] dark:bg-[#1b1b1b] rounded-lg ml-2 mb-3">
        <h3 className="dark:text-[#d0d0d0] font-bold text-xl ml-2 mb-2">New Chart Value</h3>
        {['pieName', 'value', 'bgColor', 'textColor'].map((field) => (
          <FloatingLabelInput
            key={field}
            type={field === 'value' ? 'number' : 'text'}
            placeholder={
                  field === 'pieName' ? 'Pie name' 
                : field === 'bgColor' ? 'Background color (hex, include #)'
                : field === 'textColor' ? 'Text color (hex, include #) ' 
                : `Pie value`}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            style="pointer-events-none absolute top-0 text-gray-400 text-sm transition-all duration-300"
            focusStyle="text-blue-600 text-xs -top-5 left-0 px-1"
            noFocusStyle="top-2 left-2"
            inputStyle="flex justify-end focus:border-blue-500 focus:outline-none focus:ring-0 border border-gray-300 rounded-md p-2 py-3 text-sm w-full dark:bg-[#1b1b1b] dark:text-[#d0d0d0]"
          />
        ))}
        <button className="bg-green-600 dark:bg-green-800 hover:bg-green-700 hover:dark:bg-green-900 text-white px-2 py-2 rounded-lg">
          Submit
        </button>
      </form>

      {/* Change Total */}
      <form onSubmit={handleTotalSubmit} className="p-2 flex gap-2 flex-col bg-[#e1e1e1] dark:bg-[#1b1b1b] rounded-lg ml-2 mb-3">
        <h3 className="dark:text-[#d0d0d0] font-bold text-xl ml-2 mb-2">Change Total</h3>
        <FloatingLabelInput
          type="number"
          placeholder="New total value"
          name="totalValue"
          value={totalData}
          onChange={handleTotalChange}
          style="pointer-events-none absolute top-0 text-gray-400 text-sm transition-all duration-300"
          focusStyle="text-blue-600 text-xs -top-5 left-0 px-1"
          noFocusStyle="top-2 left-2"
          inputStyle="flex justify-end focus:border-blue-500 focus:outline-none focus:ring-0 border border-gray-300 rounded-md p-2 py-3 text-sm w-full dark:bg-[#1b1b1b] dark:text-[#d0d0d0]"
        />
        <button className="bg-green-600 dark:bg-green-800 hover:bg-green-700 hover:dark:bg-green-900 text-white px-2 py-2 rounded-lg">
          Submit
        </button>
      </form>

      {/* Pie and Legend */}
      <div className="flex items-center gap-2">
        <div className="relative w-60 h-60">
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
                activeIndex={activeIndex}
                activeShape={(props) => (
                  <g>
                    <Pie
                      cx={props.cx}
                      cy={props.cy}
                      innerRadius={props.innerRadius}
                      outerRadius={props.outerRadius + 10}
                      startAngle={props.startAngle}
                      endAngle={props.endAngle}
                      data={[props.payload]}
                      dataKey="value"
                      fill={props.fill}
                    />
                  </g>
                )}
              >
                {pieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.bgColor} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Total */}
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold dark:text-[#d0d0d0]">
            {!fetchError ? total : <p className="text-red-600 text-sm">fetchError</p>}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 bg-[#e1e1e1] dark:bg-[#1b1b1b] p-2 rounded-lg">
          {pieData.map((entry, idx) => {
            const percent = ((entry.value / total) * 100).toFixed(1);
            return (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 p-2 rounded-lg"
                style={{
                  backgroundColor: entry.bgColor,
                  color: entry.textColor,
                  opacity: activeIndex === idx || activeIndex === null ? 1 : 0.5,
                }}
              >
                <button onClick={() => onLegendClick(idx)} className="flex-1 text-left">
                  <div>{entry.name}</div>
                  <div className="text-xs">{entry.value} ({percent}%)</div>
                </button>
                {entry.name !== "Remaining" && (
                  <button
                    onClick={() => handleDelete(entry.name)}
                    className="bg-red-500 rounded-lg font-bold p-0.5"
                    title="Delete slice"
                  >
                    ✖
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chart;