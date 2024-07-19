import React from "react";
import { CSmartTable, CBadge } from "@coreui/react-pro";
import "./CustomTable.css";


const CustomTable = ({ userData, columns, getBadge }) => {
  return (
    <div className="CSmartTable">
      <CSmartTable
        activePage={1}
        items={userData}
        clickableRows={false}
        columns={columns.map((column) => ({
          ...column,
          filter: false,
          sorter: false,
          _style: { width: column._style?.width || "auto" },
          scopedSlots: {
            status: (item) => (
              <td>
                <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
              </td>
            ),
          },
        }))}
       
        itemsPerPage={10}
        pagination
        tableProps={{
          className: "add-this-class",
          responsive: true,
        }}
        tableBodyProps={{
          className: "align-middle",
        }}
      />
    </div>
  );
};

export default CustomTable;
