import styled from "styled-components";
import Heading from "../../ui/Heading";
import PropTypes from "prop-types";

import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
	padding: 2.4rem 3.2rem;
	grid-column: 3 / span 2;

	& > *:first-child {
		margin-bottom: 1.6rem;
	}

	& .recharts-pie-label-text {
		font-weight: 600;
	}
`;

const startDataLight = [
	{
		category: "bakery",
		value: 0,
		color: "#875d3b",
	},
	{
		category: "dumplings",
		value: 0,
		color: "#f97316",
	},
	{
		category: "fish",
		value: 0,
		color: "#eab308",
	},
	{
		category: "deli",
		value: 0,
		color: "#1467a6",
	},
	{
		category: "sweets",
		value: 0,
		color: "#402510",
	},
	{
		category: "snacks",
		value: 0,
		color: "#c21111",
	},
];

const startDataDark = [
	{
		category: "bakery",
		value: 0,
		color: "#FCFCF0",
	},
	{
		category: "dumplings",
		value: 0,
		color: "#c2410c",
	},
	{
		category: "deli",
		value: 0,
		color: "#c0eff8",
	},
	{
		category: "sweets",
		value: 0,
		color: "#f2f689",
	},
	{
		category: "snacks",
		value: 0,
		color: "#F8A99E",
	},
];

function prepareData(startData, categories) {
	function incArrayValue(arr, field) {
		return arr.map((obj) =>
			obj.category === field ? { ...obj, value: obj.value + 1 } : obj
		);
	}
	console.log(
		"🚀 ~ file: CategoryChart.jsx:96 ~ incArrayValue ~ incArrayValue:",
		incArrayValue
	);
	const data = categories
		.reduce((arr, cur) => {
			const cat = cur;
			console.log("🚀 ~ file: CategoryChart.jsx:107 ~ .reduce ~ cat:", cat);
			if (cat === "bakery") return incArrayValue(arr, "bakery");
			if (cat === "dumplings") return incArrayValue(arr, "dumplings");
			if (cat === "fish") return incArrayValue(arr, "fish");
			if (cat === "deli") return incArrayValue(arr, "deli");
			if (cat === "sweets") return incArrayValue(arr, "sweets");
			if (cat === "snacks") return incArrayValue(arr, "snacks");
			return arr;
		}, startData)
		.filter((obj) => obj.value > 0);

	console.log("🚀 ~ file: CategoryChart.jsx:126 ~ prepareData ~ data:", data);
	return data;
}

function CategoryChart({ categories }) {
	const { isDarkMode } = useDarkMode();

	const startData = isDarkMode ? startDataDark : startDataLight;
	const data = prepareData(startData, categories);

	return (
		<ChartBox>
			<Heading as="h2">Order category summary</Heading>
			<ResponsiveContainer width="100%" height={240}>
				<PieChart>
					<Pie
						data={data}
						nameKey="category"
						dataKey="value"
						innerRadius={85}
						outerRadius={110}
						cx="40%"
						cy="50%"
						paddingAngle={3}
					>
						{data.map((entry) => (
							<Cell
								fill={entry.color}
								stroke={entry.color}
								key={entry.category}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend
						verticalAlign="middle"
						align="right"
						width="30%"
						layout="vertical"
						iconSize={15}
						iconType="circle"
					/>
				</PieChart>
			</ResponsiveContainer>
		</ChartBox>
	);
}

CategoryChart.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.string),
};

export default CategoryChart;
