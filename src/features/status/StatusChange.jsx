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
	const [confirmNew, setConfirmNew] = useState(false);
	console.log(
		"🚀 ~ file: StatusChange.jsx:29 ~ StatusChange ~ confirmNew:",
		confirmNew
	);
	const [confirmCompleted, setConfirmCompleted] = useState(false);
	const [confirmInprogress, setConfirmInprogress] = useState(false);
	const [confirmShipped, setConfirmShipped] = useState(false);

	const { statusChanged, isStatusChanged } = useStatusChange();
	console.log(
		"🚀 ~ file: StatusChange.jsx:32 ~ StatusChange ~ statusChanged:",
		statusChanged
	);

	// const navigate = useNavigate();
	const moveBack = useMoveBack();

	useEffect(() => {
		setConfirmNew(order?.status === "new" || false);
		setConfirmInprogress(order?.status === "inprogress" || false);
		setConfirmCompleted(order?.status === "completed" || false);
		setConfirmShipped(order?.status === "shipped" || false);
	}, [order, setConfirmNew]);

	if (isLoading) return <Spinner />;
	if (!order) return <Empty resource="order" />;
	console.log("🚀 ~ file: StatusChange.jsx:55 ~ StatusChange ~ order:", order);

	const { id: orderId, status } = order;

	function handleChangeStatus() {
		// if (status === "inprogress") statusCompleted(orderId);//version_1
		if (status === "new")
			statusChanged.mutate({ orderId, status: "inprogress" });
		if (status === "inprogress")
			statusChanged.mutate({ orderId, status: "completed" });
		if (status === "completed")
			statusChanged.mutate({ orderId, status: "shipped" });
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

			{status === "new" && (
				<Checkbox
					checked={confirmInprogress}
					onChange={() => setConfirmInprogress((confirm) => !confirm)}
					id="confirm progress"
				>
					I confirm that order #{orderId} is now in progress
				</Checkbox>
			)}
			{status === "inprogress" && (
				<Checkbox
					checked={confirmCompleted}
					onChange={() => setConfirmCompleted((confirm) => !confirm)}
					id="confirm completed"
				>
					I confirm that order #{orderId} is now completed
				</Checkbox>
			)}
			{status === "completed" && (
				<Checkbox
					checked={confirmShipped}
					onChange={() => setConfirmShipped((confirm) => !confirm)}
					id="confirm shipped"
				>
					I confirm that order #{orderId} is now shipped
				</Checkbox>
			)}
			<ButtonGroup>
				{status === "new" && (
					<Button
						onClick={handleChangeStatus}
						disabled={!confirmInprogress || isStatusChanged}
					>
						Change status
					</Button>
				)}
				{status === "inprogress" && (
					<Button
						onClick={handleChangeStatus}
						disabled={!confirmCompleted || isStatusChanged}
					>
						Change status
					</Button>
				)}
				{status === "completed" && (
					<Button
						onClick={handleChangeStatus}
						disabled={!confirmShipped || isStatusChanged}
					>
						Change status
					</Button>
				)}
				{/* {status === "shipped" && (
					<Button
						onClick={handleChangeStatus}
						disabled={!confirmShipped || isStatusChanged}
					>
						Change status
					</Button>
				)} */}

				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default StatusChange;
