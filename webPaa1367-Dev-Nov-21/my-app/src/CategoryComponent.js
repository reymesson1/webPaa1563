import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Media, Panel,   Card,
    Modal,
    ModalHeader,
    ModalBody,
    CardBody,
    ModalFooter, Progress, FormFeedback } from 'reactstrap';

const API_HEADERS = {

    'Content-Type':'application/json',
    Authentication: 'any-string-you-like'
}
class CategoryComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            isModalOpen: false,
            description: "",
            debit: "",
            credit: "",
            notes: "",
            transactions: []
        }       
        
        this.handleBlur = this.handleBlur.bind(this);

    }

    componentDidMount(){

        fetch(this.props.URLExternal+'/transactions')
        .then((response)=>response.json())
        .then((responseData)=>{
            console.log(responseData);
            this.setState({
                transactions: responseData
            })
        })
        .catch((error)=>{
            console.log('Error fetching and parsing data', error);
        })


    }


    onChangeField(event){

        this.setState({
            searchText: event.target.value
        })
    }

    onClicked(){

        this.setState({
            isModalOpen: true
        })

    }

    toggleModalStyle = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    onSubmitDetail(event){

        event.preventDefault();

        let newTransaction = {

            description : event.target.description.value,
            debit : event.target.debit.value,
            credit : event.target.credit.value,
            notes : event.target.notes.value,
            creator : localStorage.getItem("sub")

        }

        fetch(this.props.URLExternal+'/createtransaction', {

            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTransaction)
        })

        let nextState = this.state.transactions;

        nextState.push(newTransaction);
        console.log(newTransaction);

        this.setState({
            transactions: nextState,
            isModalOpen: false

        })

    }

    handleBlur = (field) => (evt) =>{

        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })

    }

    onDescriptionChange(value){
        this.setState({
            description: value
        })
    }
    onDebitChange(value){
        this.setState({
            debit: value
        })
    }
    onCreditChange(value){
        this.setState({
            credit: value
        })
    }
    onNotesChange(value){
        this.setState({
            notes: value
        })
    }

    render() {

        let filteredData = this.state.transactions

        return(
            <div className="container">
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModalStyle}>
                            <ModalHeader >
                                <div className="row">
                                        <p>{'Create a new transaction'}</p>                                
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <Form name="contact-form" onSubmit={this.onSubmitDetail.bind(this)}>

                                    <FormGroup row>
                                        <Label for="description" sm={1}>&nbsp;</Label>
                                        <Label for="description" sm={4}>Description</Label>
                                        <Col sm={7}>
                                        <Input type="text" name="description" id="description" placeholder="Description" 
                                            value={this.state.description}   
                                            onChange={e => this.onDescriptionChange(e.target.value)}                                   
                                        />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="debit" sm={1}>&nbsp;</Label>
                                        <Label for="debit" sm={4}>Debit</Label>
                                        <Col sm={7}>
                                        <Input type="number" name="debit" id="debit" placeholder="Debit" 
                                            value={this.state.debit}         
                                            onChange={e => this.onDebitChange(e.target.value)}                                                                
                                        />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="credit" sm={1}>&nbsp;</Label>
                                        <Label for="credit" sm={4}>Credit</Label>
                                        <Col sm={7}>
                                        <Input type="number" name="credit" id="credit" placeholder="Credit" 
                                            value={this.state.credit}                                      
                                            onChange={e => this.onCreditChange(e.target.value)}                                                                

                                        />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="notes" sm={1}>&nbsp;</Label>
                                        <Label for="notes" sm={4}>Notes</Label>
                                        <Col sm={7}>
                                        <Input type="textarea" name="notes" id="notes" placeholder="Notes" 
                                            value={this.state.notes}                                      
                                            onChange={e => this.onNotesChange(e.target.value)}                                                                
                                        />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="style" sm={2}>&nbsp;</Label>
                                        <Col sm={10}>
                                        <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" />                                        </Col>
                                    </FormGroup>
                                

                                
                                </Form>
                            </ModalBody>
                </Modal>
                <br/>
                <br/>
                <div className="row">
                    {/* <Input type="text" placeholder="Search" ></Input> */}
                    <Card style={{'width':'100%'}}>
                        <CardBody>
                            {/* <CardTitle tag="h5">Card title</CardTitle> */}
                            {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle> */}
                        </CardBody>
                        <CardBody>
                            <Input type="text" onChange={this.onChangeField.bind(this)} placeholder="Search" ></Input>
                        </CardBody>
                    </Card>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <h1>&nbsp;</h1>
                    </div>
                    <div className="col-md-6">
                        {/* <Link className="btn btn-success" to={'/createproduct'} style={{'width':'100%'}}  ><i className="fa fa-plus-circle" style={{'color':'#ffffff'}} aria-hidden="true"></i> &nbsp;&nbsp; Create a New Transaction</Link> */}
                        <div className="btn btn-success" onClick={this.onClicked.bind(this)} style={{'width':'100%'}}  >Create a New Product</div>
                    </div>
                </div>
                <div className="row">
                    <Table>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>Notes</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(
                            (data, index) => 
                                <tr>
                                    <td>{index+1}</td>                                                    
                                    <td>{data.description}</td>                                                    
                                    <td>{data.debit}</td>                                                    
                                    <td>{data.credit}</td>                                                    
                                    <td>{data.notes}</td>                                                    
                                    <td>
                                        <div className="row">
                                            <div className="col-md-4"></div>
                                            {/* <div className="col-md-1">
                                                <button className="btn btn-warning" onClick={this.onResetItem.bind(this,data.username)} ><i className="fa fa-undo" title="Reset password" style={{'color':'#ffffff'}} aria-hidden="true"></i></button>
                                            </div> */}
                                            <div className="col-md-2">
                                                {/* <button className="btn btn-danger" onClick={this.onClickDeleteModal.bind(this, data)} ><i className="fa fa-trash" style={{'color':'#ffffff'}} aria-hidden="true"></i></button> */}
                                                {/* <button className="btn btn-danger" onClick={this.onDeleteItem.bind(this,data.username)} ><i className="fa fa-trash" style={{'color':'#ffffff'}} aria-hidden="true"></i></button> */}
                                            </div>
                                            <div className="col-md-6"></div>
                                        </div>


                                    </td>                                                    
                                </tr>
                            )}
                        </tbody>
                    </Table>

                </div>     
            </div>
        );
    }

}

export default CategoryComponent; 

// 


// <tbody>
//                             {filteredData.map(
//                             (data, index) => 
//                                 <tr>
//                                     <td>{index+1}</td>                                                    
//                                     <td>{data.username}</td>                                                    
//                                     <td>{data.firstname}</td>                                                    
//                                     <td>{data.lastname}</td>                                                    
//                                     <td>{data.email}</td>                                                    
//                                     <td>
//                                         <div className="row">
//                                             <div className="col-md-4"></div>
//                                             {/* <div className="col-md-1">
//                                                 <button className="btn btn-warning" onClick={this.onResetItem.bind(this,data.username)} ><i className="fa fa-undo" title="Reset password" style={{'color':'#ffffff'}} aria-hidden="true"></i></button>
//                                             </div> */}
//                                             <div className="col-md-2">
//                                                 <button className="btn btn-danger" onClick={this.onClickDeleteModal.bind(this, data)} ><i className="fa fa-trash" style={{'color':'#ffffff'}} aria-hidden="true"></i></button>
//                                                 {/* <button className="btn btn-danger" onClick={this.onDeleteItem.bind(this,data.username)} ><i className="fa fa-trash" style={{'color':'#ffffff'}} aria-hidden="true"></i></button> */}
//                                             </div>
//                                             <div className="col-md-6"></div>
//                                         </div>


//                                     </td>                                                    
//                                 </tr>
//                             )}
//                         </tbody>