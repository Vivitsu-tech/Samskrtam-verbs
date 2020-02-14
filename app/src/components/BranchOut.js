import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'


class BranchOut extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            homeFlag: false,
            resultdata: [],
            error: ''
        }
    }
    
    componentDidMount = () => {

        const {root, form} = this.props.location.state
        console.log (`from BranchOut:  ${root},${form}` )
        var fetchstr = '';

        if (form === 'All')
        {
           //fetchstr = `https://my-json-server.typicode.com/SrividhyaGanesan/verbforms/data?dhatu=${root}`
           fetchstr = `/lakaras/${root}`
        }
        else
        {
           //fetchstr = `https://my-json-server.typicode.com/SrividhyaGanesan/verbforms/data?dhatu=${root}&voice=${form}`
           fetchstr = `/lakaras/${root}/${form}`
        }

        fetch(fetchstr)
        .then (response => response.json())
        .then (data => this.setState({resultdata: data}, 
            () => console.log(this.state)))
        .catch (error => this.setState({error: error},
            () => console.log(this.state.error)))
    }

    getData = (mood,form) => {
        console.log(form)
        return this.state.resultdata.filter((lakaras, index) => {
            const { dhatu, voice, lakara, purusha, eka, dvi, bahu } = lakaras //destructuring
            let flag = (lakara === mood)
            return (flag)
        })
    }

    renderLatTable(latarr) {

       latarr.sort((a,b) => {
        if (a.purusha < b.purusha){
            return -1
        }
        if (a.purusha > b.purusha){
            return 1
        }
        return 0;
    })
       return latarr.map((arr, index) => {
            const { id, dhatu, voice, lakara, purusha, eka, dvi, bahu } = arr //destructuring
            return (
              <tr key={purusha}>
                 <td>{eka}</td>
                 <td>{dvi}</td>
                 <td>{bahu}</td>
              </tr>
           ) 
        })  
     }

     renderLotTable(lotarr) {
        lotarr.sort((a,b) => {
            if (a.purusha < b.purusha){
                return -1
            }
            if (a.purusha > b.purusha){
                return 1
            }
            return 0;
        })
        return lotarr.map((arr, index) => {
            const { id, dhatu, voice, lakara, purusha, eka, dvi, bahu } = arr //destructuring
            return (
                <tr key={purusha}>
                    <td>{eka}</td>
                    <td>{dvi}</td>
                    <td>{bahu}</td>
                </tr>
           ) 
        }) 
     }

     renderLangTable(langarr) {
        langarr.sort((a,b) => {
            if (a.purusha < b.purusha){
                return -1
            }
            if (a.purusha > b.purusha){
                return 1
            }
            return 0;
        })
        return langarr.map((arr, index) => {
            const { id, dhatu, voice, lakara, purusha, eka, dvi, bahu } = arr //destructuring
            return (
                <tr key={id}>
                    <td>{eka}</td>
                    <td>{dvi}</td>
                    <td>{bahu}</td>
                </tr>
           ) 
        }) 
     }

     renderLrtTable(lrtarr) {
        lrtarr.sort((a,b) => {
            if (a.purusha < b.purusha){
                return -1
            }
            if (a.purusha > b.purusha){
                return 1
            }
            return 0;
        })
        return lrtarr.map((arr, index) => {
            const { id,dhatu, voice, lakara, purusha, eka, dvi, bahu } = arr //destructuring
            return (
                <tr key={id}>
                    <td>{eka}</td>
                    <td>{dvi}</td>
                    <td>{bahu}</td>
                </tr>
           ) 
        }) 
     }

     renderTableHeader(header) {
         return <th colspan="3" align="center">{header}</th>
        }

    backToHome = event => {
        event.preventDefault();
        this.setState ({homeFlag: true})
    }

    render() {
        const {root, form} = this.props.location.state
  
        if (this.state.homeFlag) {
            return <Redirect to='/' />
        }

        let dispon = this.state.resultdata.length > 0 ? true : false

        let latarr = this.getData('लट्(Present)',{form})
        let lotarr = this.getData('लोट्(command/benedict)',{form})
        let langarr = this.getData('लङ्(Past)',{form})
        let lrtarr = this.getData('लृट(Future)',{form})

        let displat = latarr.length > 0 ? true : false
        let displot = lotarr.length > 0 ? true : false
        let displang = langarr.length > 0 ? true : false
        let displrt = lrtarr.length > 0 ? true : false

        console.log(`displat: ${displat}`)
        console.log(`displot: ${displot}`)

        return (
            <div>
                <h3 id={!dispon ?"nodisp" : ""}>Displaying the {form} forms of the verb root <Badge pill variant="primary">{root}</Badge></h3>
                <h3 id={dispon ? "nodisp" : ""}>{form} forms of the verb root <Badge pill variant="primary">{root}</Badge> not found</h3>
                <Container>
                    <div class="row">
                    <div id={!displat ? "nodisp" : ""} class="table-responsive col-md-6">
                    <Table striped bordered hover size='sm'>
                        <tbody>
                            <tr>{this.renderTableHeader('लट् लकारः')}</tr>
                            {this.renderLatTable(latarr)}
                        </tbody>
                    </Table>
                    </div>
                    
                    <div id={!displot ? "nodisp" : ""} class="table-responsive col-md-6" >
                    <Table striped bordered hover size='sm'>
                        <tbody>
                            <tr>{this.renderTableHeader('लोट् लकारः')}</tr>
                            {this.renderLotTable(lotarr)}
                        </tbody>
                    </Table>
                    </div>

                    <div id={!displang ? "nodisp" : ""} class="table-responsive col-md-6">
                    <Table striped bordered hover size='sm'>
                        <tbody>
                            <tr>{this.renderTableHeader('लड् लकारः')}</tr>
                            {this.renderLangTable(langarr)}
                        </tbody>
                    </Table>
                    </div>
                    
                    <div id={!displrt ? "nodisp" : ""} class="table-responsive col-md-6" >
                    <Table striped bordered hover size='sm'>
                        <tbody>
                            <tr>{this.renderTableHeader('लृट् लकारः')}</tr>
                            {this.renderLrtTable(lrtarr)}
                        </tbody>
                    </Table>
                    </div>
                    </div>
                </Container>
                <button onClick={this.backToHome}>Home</button>
            </div>
        );
    }
}

export default BranchOut;