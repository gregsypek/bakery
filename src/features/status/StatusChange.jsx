import styled from "styled-components";

import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
// import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
// import { statusToTagName } from "../status/statusTagName";
// import { useNavigate } from "react-router-dom";
import { useOrder } from "../orders/useOrder";
import OrderDataBox from "../orders/OrderDataBox";
import { useEffect, useState } from "react";
// import Checkbox from "../../ui/Checkbox";
import { useStatusChange } from "./useStatusChange";
import { ConfirmationCheckbox } from "./ConfirmationCheckbox";
import { ChangeStatusButton } from "./ChangeStatusButton";
import { statusToTagName } from "./statusTagName";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function StatusChange() {
	const { order, isLoading } = useOrder();
	const [confirmNew, setConfirmNew] = useState(false);
	console.log(
		"🚀 ~ file: StatusChange.jsx:29 ~ StatusChange ~ confirmNew:",
		confirmNew
	);
	const [confirmCompleted, setConfirmCompleted] = useState(false);
	const [confirmInprogress, setConfirmInprogress] = useState(false);
	const [confirmShipped, setConfirmShipped] = useState(false);
	const [confirmDelivered, setConfirmDelivered] = useState(false);

	const { statusChanged, isStatusChanged } = useStatusChange();

	const moveBack = useMoveBack();

	useEffect(() => {
		setConfirmNew(order?.status === "new" || false);
		setConfirmInprogress(order?.status === "inprogress" || false);
		setConfirmCompleted(order?.status === "completed" || false);
		setConfirmShipped(order?.status === "shipped" || false);
		setConfirmDelivered(order?.status === "delivered" || false);
	}, [order, setConfirmNew]);

	if (isLoading) return <Spinner />;
	if (!order) return <Empty resource="order" />;
	console.log("🚀 ~ file: StatusChange.jsx:55 ~ StatusChange ~ order:", order);

	const { id: orderId, status, hasDelivery } = order;

	const allStatusKeysInOrder = Object.keys(statusToTagName);

	function handleChangeStatus() {
		console.log(
			"🚀 ~ file: StatusChange.jsx:70 ~ handleChangeStatus ~ hasDelivery:",
			hasDelivery
		);
		// if (status === "inprogress") statusCompleted(orderId);//version_1
		if (status === "new")
			statusChanged.mutate({ orderId, status: "inprogress" });
		if (status === "inprogress")
			statusChanged.mutate({ orderId, status: "completed" });
		if (status === "completed" && hasDelivery)
			statusChanged.mutate({ orderId, status: "shipped" });
		if (status === "completed" && !hasDelivery)
			statusChanged.mutate({ orderId, status: "delivered" });
		if (status === "shipped")
			statusChanged.mutate({ orderId, status: "delivered" });
	}

	const statusConfig = {
		new: {
			confirmationCheckbox: confirmInprogress,
			confirmationSetter: setConfirmInprogress,
			label: `I confirm that order #${orderId} is now in progress`,
		},
		inprogress: {
			confirmationCheckbox: confirmCompleted,
			confirmationSetter: setConfirmCompleted,
			label: `I confirm that order #${orderId} is now completed`,
		},
		completed: {
			confirmationCheckbox: hasDelivery ? confirmShipped : confirmDelivered,
			confirmationSetter: hasDelivery ? setConfirmShipped : setConfirmDelivered,
			label: `I confirm that order #${orderId} is now ${
				hasDelivery ? "shipped" : "delivered"
			}`,
		},
		shipped: {
			confirmationCheckbox: confirmDelivered,
			confirmationSetter: setConfirmDelivered,
			label: `I confirm that order #${orderId} is now delivered`,
		},
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading type="h1">Order #{orderId}</Heading>
					{/* <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag> */}
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>
			<OrderDataBox order={order} />

			{statusConfig[status] && (
				<ConfirmationCheckbox
					checked={statusConfig[status].confirmationCheckbox}
					onChange={() =>
						statusConfig[status].confirmationSetter((confirm) => !confirm)
					}
					label={statusConfig[status].label}
				/>
			)}

			<ButtonGroup>
				{allStatusKeysInOrder.map(
					(statusKey) =>
						statusKey === status && (
							<ChangeStatusButton
								key={statusKey}
								onClick={handleChangeStatus}
								disabled={
									!statusConfig[statusKey].confirmationCheckbox ||
									isStatusChanged
								}
							/>
						)
				)}

				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default StatusChange;
