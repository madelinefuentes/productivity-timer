import {useState} from "react"
import LiquidFillGauge from 'react-liquid-gauge';
import {Row} from 'react-bootstrap'

function Gauge(props) {
    const [value, setValue] = useState(50);

    return (
        <Row className = "d-flex justify-content-center">
            <LiquidFillGauge
                style={{ margin: '0 auto' }}
                value={value}
                width="250"
                percent="%"
                textSize={1}
                textOffsetX={0}
                textOffsetY={0}
                textRenderer={() => {
                    return (
                        <tspan>
                            <tspan className="value">{value}</tspan>
                        </tspan>
                    );
                }}
                riseAnimation
                waveAnimation
                waveFrequency={2}
                waveAmplitude={1}
                circleStyle={{
                    fill: "#cb6935"
                }}
                waveStyle={{
                    fill: "#cb6935"
                }}
                textStyle={{
                    fill: "#444",
                    fontFamily: 'Arial'
                }}
                waveTextStyle={{
                    fill: '#fff',
                    fontFamily: 'Arial'
                }}
                onClick={() => {
                    this.setState({ value: Math.random() * 100 });
                }}
            />
        </Row>
    )
}

export default Gauge