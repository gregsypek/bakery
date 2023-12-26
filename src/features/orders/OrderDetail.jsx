import styled from "styled-components";

import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
// import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import { useOrder } from "./useOrder";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
// import { statusToTagName } from "../status/statusTagName";
import OrderDataBox from "./OrderDataBox";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function OrderDetail() {
	const { order, isLoading } = useOrder();

	const moveBack = useMoveBack();

	if (isLoading) return <Spinner />;
	if (!order) return <Empty resource="order" />;

	const { id: orderId, status } = order;

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
			<ButtonGroup>
				{status === "completed" && (
					<Button>Order Confirmation for Pickup</Button>
				)}

				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default OrderDetail;
