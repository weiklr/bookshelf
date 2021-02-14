// this is for extra credit
import React from 'react'
import {client} from 'utils/api-client'

let queue = []

const sendProfileQueue = () => {
  if (!queue.length) {
    return Promise.resolve({success: true})
  }
  const queueToSend = [...queue]
  queue = []
  return client('profile', {data: queueToSend})
}

setInterval(sendProfileQueue, 5000)

const Profiler = ({phases, metadata, ...props}) => {
  const reportProfile = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  ) => {
    if (!phases || phases.includes(phase)) {
      queue.push({
        id,
        metadata,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions: [...interactions],
      })
    }
  }
  return <React.Profiler onRender={reportProfile} {...props} />
}

export {Profiler}
export {
  unstable_trace as trace,
  unstabled_wrap as wrap,
} from 'scheduler/tracing'
