import React from "react";
import T from "prop-types";
import Highcharts from "Highcharts";

export default class ChartComponent extends React.Component {
    componentDidMount() {
        this.chart = new Highcharts.Chart(
            this.refs.chart,
            this.props.options
        );
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    render() {
        return (
            <div ref="chart"/>
        );
    }
}

ChartComponent.propTypes = {
    options: T.object
};
