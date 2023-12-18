import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
	const {
		isLoading,
		settings: {
			priorityFee,
			minOrderValue,
			maxOrderDistance,
			deliveryFee,
		} = {},
	} = useSettings();
	const { isUpdating, updateSetting } = useUpdateSetting();

	if (isLoading) return <Spinner />;

	function handleUpdate(e, field) {
		const { value } = e.target;

		if (!value) return;
		updateSetting({ [field]: value });
	}

	return (
		<Form>
			<FormRow label="Minimum order value">
				<Input
					type="number"
					id="min-value"
					disabled={isUpdating}
					defaultValue={minOrderValue}
					onBlur={(e) => handleUpdate(e, "minOrderValue")}
				/>
			</FormRow>
			<FormRow label="Maximum order distance">
				<Input
					type="number"
					id="max-distance"
					defaultValue={maxOrderDistance}
					onBlur={(e) => handleUpdate(e, "maxOrderDistance")}
				/>
			</FormRow>
			<FormRow label="Priority fee">
				<Input
					type="text"
					id="priority"
					defaultValue={priorityFee}
					onBlur={(e) => handleUpdate(e, "priorityFee")}
				/>
			</FormRow>
			<FormRow label="Delivery fee">
				<Input
					type="text"
					id="delivery"
					defaultValue={deliveryFee}
					onBlur={(e) => handleUpdate(e, "deliveryFee")}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
