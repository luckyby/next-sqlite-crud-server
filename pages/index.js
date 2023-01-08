import Image from "next/image";
import tablePic from '../public/user-db.png';
import styles from '../styles/Home.module.css'
// import { promises as fs } from 'fs'
import path from 'path'

// import {setTimeout} from "timers/promises";

import App from "next/app";

export default function Home() {
  // console.log('start pages/index.js')
  return (

    <>
      <div className={styles.main}>

          <h1>Welcome to sqlite db server based on Next.js!</h1><br/>
          <h3>Database &quot;users.db&quot; has table &quot;person&quot; that contains informaition in the following form:</h3>

          {/*<Image src={tablepic} style={{height: "86px", marginBottom: "1.0rem"}} width="576px" height="86px" alt="sqlite3 data example"  />*/}
          <Image src={tablePic}  alt="sqlite3 data example" priority="true"  />
        <br/>
        <br/>
          <h2>CRUD server has the next endpoints:</h2>

        {/*<table style={{border: "2px solid #c6c6c6", borderSpacing: "0px"}}>*/}
        <table className={styles.table}>
          {/*<thead style={{backgroundColor: "lightblue", borderBottom: "1px solid gray"}}>*/}
          <thead >
            <tr style={{backgroundColor: "ghostWhite"}} >
              <th style={{width: "150px", borderBottom: "1px solid #c6c6c6" }}>Method</th>
              <th style={{width: "200px", borderBottom: "1px solid #c6c6c6"  }}>Endpoint</th>
              <th style={{width: "450px", borderBottom: "1px solid #c6c6c6"  }}>Description</th>
              {/*<th style={{width: "300px", borderBottom: "3px double gray"}}>Example</th>*/}
            </tr>
          </thead>
          <tbody>
          <tr>
            <td colSpan="3" className={styles.tdEmpty}></td>
          </tr>
          <tr>
            <td  className={styles.tdBottomBorder + " " + styles.colorPostMethod}><b className={styles.tdFlexCenter}>CREATE</b></td>
            <td  className={styles.tdBottomBorder + ' ' +styles.tdPaddingLeft + " " + styles.colorPostMethod}>/api/person/restore</td>
            <td  className={styles.tdBottomBorder + ' ' +styles.tdPaddingLeft + " " + styles.colorPostMethod}><i>Restore table &quot;person&quot; to original state  </i></td>

          </tr>
          <tr >
            <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
            <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle} >
                <pre style={{margin: "0px"}}>
                  {
                      "method:'POST';\n" +
                      "headers: {'Content-Type': 'application/json'};\n" +
                      "body: JSON.stringify({\"login\": \"admin\",\"password\": \"5678\"});\n" +
                      "redirect: 'follow'"
                  }
                </pre>
            </td>
          </tr>
            <tr>
              <td colSpan="3" className={styles.tdEmpty} ></td>
            </tr>
            <tr>
              <td  className={styles.tdBottomBorder + " " + styles.colorPostMethod}><b className={styles.tdFlexCenter}>CREATE</b></td>
              <td  className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorPostMethod}>/api/person</td>
              <td  className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorPostMethod}><i>Create one person with firstname, lastname, and role</i></td>

            </tr>
            <tr>
              <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
              <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle}>
                <pre style={{margin: "0px"}}>
                  {
                      "method:'POST';\n" +
                      "headers: {'Content-Type': 'application/x-www-form-urlencoded'};\n" +
                      "body: {\"firstName\":\"Ben\",\"lastName\":\"Rogers\",\"role\":\"captain\"}\n" +
                      "redirect: 'follow'"
                  }
                </pre>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className={styles.tdEmpty}></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder + " " + styles.colorGetMethod}><b className={styles.tdFlexCenter}>READ</b></td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorGetMethod}>/api/person</td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorGetMethod}><i>Read all persons</i></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
              <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle}>
                <pre style={{margin: "0px"}}>
                  {
                      "method:'GET';\n" +
                      "redirect: 'follow'"
                  }
                </pre>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className={styles.tdEmpty}></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder + " " + styles.colorGetMethod}><b className={styles.tdFlexCenter}>READ</b></td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorGetMethod}>/api/person/id/[id]</td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorGetMethod}><i>Read one person by id</i></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
              <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle}>
                <pre style={{margin: "0px"}}>
                  {
                      "method:'GET';\n" +
                      "redirect: 'follow'"
                  }
                </pre>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className={styles.tdEmpty}></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder + " " + styles.colorPutMethod}><b className={styles.tdFlexCenter}>UPDATE</b></td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorPutMethod}>/api/person/id/[id]</td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorPutMethod}><i>Update one person by id</i></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
              <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle}>
                <pre style={{margin: "0px"}}>
                  {
                      "method:'PATCH';\n" +
                      "headers: {'Content-Type':'application/x-www-form-urlencoded'};\n" +
                      "body: \"{\"firstName\":\"Peter\",\"lastName\":\"Parker\",\"role\":\"spider-man\"}\"\n"+
                      "redirect: 'follow'"
                  }
                </pre>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className={styles.tdEmpty}></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder + " " + styles.colorDeleteMethod}><b className={styles.tdFlexCenter}>DELETE</b></td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorDeleteMethod}>/api/person/id/[id]</td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorDeleteMethod}><i>Delete one person by id</i></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
              <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle}>
                <pre style={{margin: "0px"}}>
                  {
                      "method:'DELETE';\n" +
                      "redirect: 'follow'"
                  }
                </pre>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className={styles.tdEmpty}></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder + " " + styles.colorDeleteMethod}><b className={styles.tdFlexCenter}>DELETE</b></td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorDeleteMethod}>/api/person</td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorDeleteMethod}><i>Delete all persons</i></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
              <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle}>
                <pre style={{margin: "0px"}}>
                  {
                      "method:'DELETE';\n" +
                      "redirect: 'follow'"
                  }
                </pre>
              </td>
            </tr>
          </tbody>

        </table>

      </div>

    </>
  )
}


// export const   getServerSideProps = async ()=>{
// // export async function getStaticProps(context) {
// //   console.log('0 seconds')
//   // await setTimeout(8000)
//   // console.log('after timer(8000)')
//   const dev = process.env.NODE_ENV !== 'production';
//   // const server = dev ? 'http://localhost:4003' : 'https://next-sqlite-crud-server.vercel.app';
//   const server = dev  ? 'http://localhost:4003' : `${process.cwd()}` ;
//   // const server = dev  ? 'http://localhost:4003' : 'http://localhost:4003' ;
//   const restoreUrl = server + '/api/person/restore'
//   // console.log('restoreUrl:', restoreUrl)
//   let requestOptions = {
//     method: 'POST',
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({'login': 'admin','password': '5678'}),
//     redirect: 'follow'
//   };
//
//   const res = await fetch(restoreUrl, requestOptions)
//       .then(response => response.text())
//       .then(result => {
//       })
//       .catch(error => console.log('error', error));
//
//
//   return {
//     props: {},
//   };
// }
