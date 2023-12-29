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
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteOrder } from "./useDeleteOrder";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function OrderDetail() {
	const { order, isLoading } = useOrder();
	const navigate = useNavigate();
	const { deleteOrder, isDeleting } = useDeleteOrder();
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
				{/* <Button onClick={() => {}}>{`Delete Order #${orderId}`}</Button> */}
				<Modal>
					<Modal.Open opens={"delete"}>
						<Button $variation="danger">{`Delete Order #${orderId}`}</Button>
					</Modal.Open>
					<Modal.Window name={"delete"}>
						{/* NOTE: onSettled is invoke both when there is error or success  */}
						<ConfirmDelete
							resourceName="order"
							onConfirm={() =>
								deleteOrder(orderId, { onSettled: () => navigate(-1) })
							}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Modal>
				{status !== "delivered" && (
					<Button onClick={() => navigate(`/status/${orderId}`)}>
						Change status here
					</Button>
				)}

				<Button $variation="empty" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default OrderDetail;
