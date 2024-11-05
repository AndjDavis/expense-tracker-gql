import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import Spinner from "../Spinner";
import { GET_TRANSACTION_STATISTICS } from "../../graphql/queries/transaction.query";
import * as constants from "../../utils/constants";

const staticDataSet = {
	backgroundColor: [],
	borderColor: [],
	borderRadius: 30,
	borderWidth: 1,
	cutout: 130,
	data: [],
	label: "$",
	spacing: 10,
};

const chartDataInitialState = {
	labels: [],
	datasets: [{ ...staticDataSet }],
};

const SAVINGS_RGBA = "rgba(75, 192, 192)";
const EXPENSE_RGBA = "rgba(255, 99, 132)";
const INVESTMENT_RGBA = "rgba(54, 162, 235, 1)";

const categoryColorMap = {
	[constants.CATEGORY_EXPENSE]: EXPENSE_RGBA,
	[constants.CATEGORY_INVESTMENT]: INVESTMENT_RGBA,
	[constants.CATEGORY_SAVING]: SAVINGS_RGBA,
};

ChartJS.register(ArcElement, Tooltip, Legend);
const capitolizeCategory = (value) =>
	value.charAt(0).toUpperCase() + value.slice(1);

const DoughnutChart = () => {
	const { data, loading } = useQuery(GET_TRANSACTION_STATISTICS);
	const [chartData, setChartData] = useState(chartDataInitialState);

	useEffect(() => {
		if (data?.categoryStatistics && Array.isArray(data.categoryStatistics)) {
			setChartData((prev) => {
				const newLabels = [];
				const newData = [];
				const newColorScheme = [];

				data.categoryStatistics.forEach(({ category, totalAmount }) => {
					const label = capitolizeCategory(category);
					newLabels.push(label);
					newData.push(totalAmount);
					const categoryColor = categoryColorMap[category];
					newColorScheme.push(categoryColor);
				});

				return {
					labels: newLabels,
					datasets: [
						{
							...staticDataSet,
							borderColor: newColorScheme,
							backgroundColor: newColorScheme,
							data: newData,
						},
					],
				};
			});
		}
	}, [data]);

	let content = <Doughnut data={chartData} />;
	if (loading) {
		content = <Spinner />;
	}

	return content;
};

export default DoughnutChart;