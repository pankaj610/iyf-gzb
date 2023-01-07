import { Button, Col, Row } from "react-bootstrap";

export const DYS_COLUMNS = (cb, disabled, session_id) => [
  {
    name: "Name",
    selector: (row) => row.devoteeInfo?.[0]?.name,
  },
 
  
  {
    name: "Email",
    selector: (row) => row.devoteeInfo?.[0]?.email,
  },
  {
    name: "Dob",
    selector: (row) => row.devoteeInfo?.[0]?.dob && new Date(row.devoteeInfo?.[0]?.dob).toDateString(),
  },
  {
    name: "Contact",
    selector: (row) => <a href={`tel:${row.devoteeInfo?.[0]?.contact}`}>{row.devoteeInfo?.[0]?.contact}</a>,
  },
  {
    name: "Ticket Id",
    selector: (row) => row.ticket_id,
  },

  {
    name: "Batch",
    selector: (row) => row.dys_batch?.replace("_", " ")?.toLocaleUpperCase(),
  },
  {
    name: "Facilitator",
    selector: (row) => row.devoteeInfo?.[0]?.facilitator,
  },
  {
    name: "Attendance",
    selector: (row) => {
      // const sessions = Object.keys(row.present);
      // const session = sessions?.[session_id];
      const isPresent = row.present?.[session_id];
      return (
        <div>
          {session_id?.split("_").join(" ").toLocaleUpperCase()} &nbsp;
          <Button variant={ isPresent ? "success": "secondary"}
            onClick={() =>
              cb("mark_attendance", { row, isPresent, session: session_id })
            }
            >
            {isPresent ? "Mark Absent" : "Mark Present"}
          </Button>
        </div>
      );
    },
  },

  {
    name: "Actions",
    button: true,
    selector: (row) => (
      <Row>
        <Col md={4} xs={5}>
          <Button
            variant="info"
            className="text-white"
            onClick={() => {
              cb("view", row);
            }}
          >
            <i class="fa-sharp fa-solid fa-eye"></i> 
            &nbsp; View
          </Button>
        </Col> 
        <Col md={4} xs={5}>
          <Button
            variant="warning"
            className="text-white"
            onClick={() => {
              cb("edit", row);
            }}
          >
            <i class="fa-solid fa-pen-to-square"></i> 
            &nbsp; Edit
          </Button>
        </Col> 
      </Row>
    ),
  }, 
];
