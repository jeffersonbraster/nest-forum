import { WatchedList } from './watched-list'

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('WatchedList', () => {
  it('shoud be able to create a watched list with initial items', () => {
    const list = new NumberWatchedList([1, 2, 3])
    expect(list.getItems()).toEqual([1, 2, 3])
  })

  it('shoud be able to add new items to the list', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)

    expect(list.currentItems).toHaveLength(4)
    expect(list.getNewItems()).toEqual([4])
  })

  it('shoud be able to remove items from the list', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(2)

    expect(list.currentItems).toHaveLength(2)
    expect(list.getRemovedItems()).toEqual([2])
  })

  it('shoud be able to add item even if it was removed before', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(2)
    list.add(2)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })

  it('shoud be able to remove item even if it was added before', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)
    list.remove(4)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })

  it('shoud be able to updated watched list items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.update([1, 3, 5])

    expect(list.getRemovedItems()).toEqual([2])
    expect(list.getNewItems()).toEqual([5])
  })
})
