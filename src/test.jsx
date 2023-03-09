
// if (checkedItem && pendingState.Type === "Buyer") {
//     console.log("inside buyer");
//     if (checkedItem.Price === pendingState.Price && checkedItem.Qty === pendingState.Qty && checkedItem.Type === "Seller") {
//       dispatch(addCompleteOrder(pendingState));
//       dispatch(deletePending(checkedItem._id))
//         .then(() => {
//           dispatch(getPending());
//           dispatch(getCompleteOrder());
//         })
//     }
//     else if (checkedItem.Price === pendingState.Price && checkedItem.Qty < pendingState.Qty && checkedItem.Type === "Seller") {
//       let newQty = pendingState.Qty - checkedItem.Qty;
//       let newPendingState = {
//         Type: pendingState.Type,
//         Qty: newQty,
//         Price: pendingState.Price
//       };
//       let newCompleteState = {
//         Type: pendingState.Type,
//         Qty: checkedItem.Qty,
//         Price: pendingState.Price
//       };
//       console.log("new Buyer PendingState1:", newPendingState);
//       // dispatch(updatePending(checkedItem._id, newPendingState));
//       dispatch(deletePending(checkedItem._id));
//       dispatch(addPending(newPendingState));
//       dispatch(addCompleteOrder(newCompleteState))
//         .then(() => {
//           dispatch(getPending());
//           dispatch(getCompleteOrder());
//         })
//     }
//     else if (checkedItem.Price === pendingState.Price && checkedItem.Qty > pendingState.Qty && checkedItem.Type === "Seller") {
//       let newQty = checkedItem.Qty - pendingState.Qty;
//       let newPendingState = {
//         Type: "Seller",
//         Qty: newQty,
//         Price: pendingState.Price
//       };
//       let newCompleteState = {
//         Type: pendingState.Type,
//         Qty: pendingState.Qty,
//         Price: pendingState.Price
//       };
//       console.log("new Seller PendingState1:", newPendingState);
//       dispatch(updatePending(checkedItem._id, newPendingState));
//       dispatch(addCompleteOrder(newCompleteState))
//         .then(() => {
//           dispatch(getPending());
//           dispatch(getCompleteOrder());
//         });
//     }
//   }
//   else if (checkedItem && pendingState.Type === "Seller") {
//     if (checkedItem.Price === pendingState.Price && checkedItem.Qty === pendingState.Qty && checkedItem.Type === "Buyer") {
//       dispatch(addCompleteOrder(pendingState));
//       dispatch(deletePending(checkedItem._id))
//         .then(() => {
//           dispatch(getPending());
//           dispatch(getCompleteOrder());
//         })
//     }
//     else if (checkedItem.Price === pendingState.Price && checkedItem.Qty < pendingState.Qty && checkedItem.Type === "Buyer") {
//       let newQty = pendingState.Qty - checkedItem.Qty;
//       let newPendingState = {
//         Type: pendingState.Type,
//         Qty: newQty,
//         Price: pendingState.Price
//       };
//       let newCompleteState = {
//         Type: pendingState.Type,
//         Qty: checkedItem.Qty,
//         Price: pendingState.Price
//       };
//       console.log("new seller PendingState2:", newPendingState);
//       // dispatch(updatePending(checkedItem._id, newPendingState));
//       dispatch(deletePending(checkedItem._id));
//       dispatch(addPending(newPendingState));
//       dispatch(addCompleteOrder(newCompleteState))
//         .then(() => {
//           dispatch(getPending());
//           dispatch(getCompleteOrder());
//         });
//     }
//     else if (checkedItem.Price === pendingState.Price && checkedItem.Qty > pendingState.Qty && checkedItem.Type === "Buyer") {
//       let newQty = checkedItem.Qty - pendingState.Qty;
//       let newPendingState = {
//         Type: "Buyer",
//         Qty: newQty,
//         Price: pendingState.Price
//       };
//       let newCompleteState = {
//         Type: pendingState.Type,
//         Qty: pendingState.Qty,
//         Price: pendingState.Price
//       };
//       console.log("new buyer PendingState2:", newPendingState);
//       dispatch(updatePending(checkedItem._id, newPendingState))
//       dispatch(addCompleteOrder(newCompleteState))
//         .then(() => {
//           dispatch(getPending());
//           dispatch(getCompleteOrder());
//         });
//     }
//   }
//   else {
//     console.log("else");
//     dispatch(addPending(pendingState))
//       .then(() => {
//         dispatch(getPending());
//         dispatch(getCompleteOrder());
//       });
//   }