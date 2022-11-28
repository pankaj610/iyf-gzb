export const DYS_COLUMNS = (cb, disabled) => [
    {
        name: "Name",
        selector: (row) => row.devoteeInfo?.[0]?.name,
      },
  
      {
        name: "Email",
        selector: (row) => row.devoteeInfo?.[0]?.email,
      },
  
      {
        name: "Contact",
        selector: (row) => row.devoteeInfo?.[0]?.contact,
      },
      {
        name: "Ticket Id",
        selector: (row) => row.ticket_id,
      },
  
      {
        name: "Batch",
        selector: (row) => row.dys_batch,
      },
  
      {
        name: "Attendance",
        selector: (row) => {
          const sessions = Object.keys(row.present);
          const labels = sessions.map((session, key) => { 
            if(session.indexOf("session") < 0 ) return null; // hide extra id key
  
            const isPresent = row.present?.[session];
            return (
              <div key={key}>
                <label>{session?.split("_").join(" ").toLocaleUpperCase()}</label>
                <label style={{
                        color: "white",
                        background: isPresent ?  "#050" : "#666" ,
                        border: "1px solid black",
                        margin: "2px 8px",
                        borderRadius: "4px",
                        padding: "1px 4px",
                      }} onClick={()=>cb('mark_attendance', {row, isPresent,session})}>{ isPresent ? 'Mark Absent': 'Mark Present'}</label>
              </div>
            );
          });
          return labels;
        },
      },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <div>
          <button
            style={{
              border: "1px solid black",
              margin: "2px",
              borderRadius: "4px",
            }}
            onClick={() => {
              cb("view", row);
            }}
          >
            View
          </button>
          <button
            style={{
              border: "1px solid black",
              margin: "2px",
              borderRadius: "4px",
            }}
            onClick={() => {
              cb("edit", row);
            }}
          >
            Edit
          </button>
        </div>
      ),
    },
  ];
  