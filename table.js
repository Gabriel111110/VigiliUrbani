export const createTable = (parentElement) => {
    let data;
    return {
      build: (dataInput) => {
        data = dataInput;
      },
      render: () => {
        
        let htmlTable = "<table class='table table-bordered' > <th>Nome</th> <th>data</th> <th>Ora</th> <th>Morti</th> <th>Feriti</th>";
        htmlTable += data.map((row) => 
          "<tr>" + row.map((col) => 
            "<td>" + col + "</td>"
          ).join("")
        ).join("") + "</tr>";
        htmlTable += "</table";
        parentElement.innerHTML = htmlTable;
      },
      getData : ()=>{
        return data;
      },
      setData: (d)=>{
        data = d;
      }
    }
  }
  