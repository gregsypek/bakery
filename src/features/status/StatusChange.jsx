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
import Checkbox from "../../ui/Checkbox";
import { useStatusChange } from "./useStatusChange";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function StatusChange() {
	const { order, isLoading } = useOrder();
	const [confirmCompleted, setConfirmCompleted] = useState(false);
	const [confirmInprogress, setConfirmInprogress] = useState(false);

	const { statusChanged, isStatusChanged } = useStatusChange();
	console.log(
		"🚀 ~ file: StatusChange.jsx:32 ~ StatusChange ~ statusChanged:",
		statusChanged
	);

	// const navigate = useNavigate();

	const moveBack = useMoveBack();

	useEffect(() => {
		setConfirmCompleted(order?.status === "completed" || false);
		setConfirmInprogress(order?.status === "inprogress" || false);
	}, [order]);

	if (isLoading) return <Spinner />;
	if (!order) return <Empty resource="order" />;

	const { id: orderId, status } = order;

	function handleChangeStatus() {
		// if (status === "inprogress") statusCompleted(orderId);//version_1
		if (status === "inprogress")
			statusChanged.mutate({ orderId, status: "completed" });
	}

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

			{status !== "shipped" && status !== "new" && (
				<Checkbox
					checked={confirmCompleted}
					onChange={() => setConfirmCompleted((confirm) => !confirm)}
					id="confirm"
					disabled={order?.status === "shipped"}
				>
					I confirm that order #{orderId} has been completed
				</Checkbox>
			)}
			{status === "new" && (
				<Checkbox
					checked={confirmInprogress}
					onChange={() => setConfirmInprogress((confirm) => !confirm)}
					id="confirm progress"
					disabled={order?.status === "inprogress"}
				>
					I confirm that order #{orderId} is now in progress
				</Checkbox>
			)}
			<ButtonGroup>
				{status !== "shipped" && (
					<Button
						onClick={handleChangeStatus}
						disabled={
							(!confirmCompleted && status !== "new") ||
							(status === "new" && !confirmInprogress) ||
							isStatusChanged
						}
					>
						Change status {console.log("confirmCompleted", confirmCompleted)}
						{/* Change status {console.log("confirmInprogress", confirmInprogress)} */}
					</Button>
				)}
				{/* {status === "inprogress" && (
					<Button
						onClick={() => navigate(`/status/${orderId}`)}
						disabled={!confirmCompleted}
					>
						Change status
					</Button>
				)} */}
				{/* {status === "completed" && (
					<Button>Order Confirmation for Pickup</Button>
				)} */}

				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default StatusChange;
