import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form from '../Components/Form'
import * as pageActions from '../actions/PageActions'

class App extends Component {
    render() {
        const { form } = this.props;
        const actions = this.props.pageActions;

        return <div>
            <Form form={ form } actions={ actions } fetching={ form.fetching } />
            <p>
                {(
                    () => {
                        switch (form.fetching) {
                            case 'fail':
                                return 'Ошибка';
                            case 'process':
                                return 'Данные отправляются...';
                            case 'success':
                                return 'Данные успешно отправлены!';
                        }
                    }
                )()}
            </p>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        form: state.form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
