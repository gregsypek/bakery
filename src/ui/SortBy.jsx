import Select from "./Select";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const sortBy = searchParams.get("sortBy") || "";

	function handleChange(e) {
		searchParams.set("sortBy", e.target.value);
		setSearchParams(searchParams);
	}
	return (
		<Select
			options={options}
			$type="white"
			value={sortBy}
			onChange={handleChange}
		/>
	);
}

SortBy.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string,
		})
	),
};
export default SortBy;
