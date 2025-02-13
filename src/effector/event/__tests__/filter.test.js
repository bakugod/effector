//@flow

import {createEvent, type Event} from 'effector'
import {getSpyCalls, spy, argumentHistory} from 'effector/fixtures'
import {show} from 'effector/fixtures/showstep'

describe('event.filter with config {fn: (T) => boolean}', () => {
  it('filter out when fn returns falsy', () => {
    const fn = jest.fn()
    const event = createEvent()
    const filtered = event.filter({
      fn: x => x > 0,
    })
    filtered.watch(x => fn(x))
    event(2)
    event(-1)
    expect(argumentHistory(fn)).toEqual([2])
  })
  it('works with undefined as well', () => {
    const fn = jest.fn()
    const event = createEvent()
    const filtered = event.filter({
      fn: x => x === undefined,
    })
    filtered.watch(x => fn(x))
    event(2)
    event()
    expect(argumentHistory(fn)).toEqual([undefined])
  })
})

describe('event.filter with function (T) => S | void', () => {
  test('event.filter should infer type', () => {
    const num: Event<number | '-1'> = createEvent('number')

    const evenNum = num.filter(n => {
      if (n !== '-1') return n
    })

    evenNum.watch(e => spy(e))

    num(0)
    num('-1')
    num(2)
    num('-1')
    num(4)
    ;(evenNum: Event<number>) //Should not fail

    expect(getSpyCalls()).toEqual([[0], [2], [4]])
  })

  test('event.filter should drop undefined values', () => {
    const num: Event<number> = createEvent('number')
    const evenNum = num.filter(n => {
      if (n % 2 === 0) return n * 2
    })

    evenNum.watch(e => spy(e))

    num(0)
    num(1)
    num(2)
    num(3)
    num(4)

    expect(getSpyCalls()).toEqual([[0], [4], [8]])

    expect(show(num.graphite)).toMatchSnapshot('num event graph')
    expect(show(evenNum.graphite)).toMatchSnapshot('evenNum event graph')
  })
})
