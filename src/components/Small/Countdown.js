// @flow
import * as React from 'react'
import './styles/Countdown.css'
import * as pluralize from 'pluralize'
import { TimeLeft } from '../../types/TimeLeft'
import { Icon } from 'antd'

type Props = {
  timeLeft: TimeLeft,
  isLoading: boolean,
}

class Countdown extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    const {
      timeLeft,
      isLoading,
    } = this.props

    if (isLoading) {
      return (
        <div className="CountdownLoadingSpinner">
          <Icon type="loading" />
        </div>
      )
    }

    return (
      <div className="Countdown">
        <span className="Countdown__Item">
          <span className="Countdown__Item-value">{timeLeft.days}</span>
          <span className="Countdown__Item-caption">{pluralize('Day', timeLeft.days)}</span>
        </span>

        <span className="Countdown__Item">
          <span className="Countdown__Item-value">{timeLeft.hours}</span>
          <span className="Countdown__Item-caption">{pluralize('Hour', timeLeft.hours)}</span>
        </span>

        <span className="Countdown__Item">
          <span className="Countdown__Item-value">{timeLeft.min}</span>
          <span className="Countdown__Item-caption">Min</span>
        </span>

        <span className="Countdown__Item">
          <span className="Countdown__Item-value">{timeLeft.sec}</span>
          <span className="Countdown__Item-caption">Sec</span>
        </span>
      </div>
    )
  }
}

export { Countdown }
