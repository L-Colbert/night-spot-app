import React, { Component } from 'react'

// Code source: https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers
class ErrorHandling extends Component {
    constructor(props) {
        super(props)
        this.state = { error: null, errorInfo: null }
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        // console.log('i got here')
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <h2>Something went wrong...</h2>
                    <p>Page unavailable, Try refreshing!</p>
                </div>
            )
        }
        // Normally, just render children
        return this.props.children;
    }
}

export default ErrorHandling
