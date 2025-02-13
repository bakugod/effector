// @flow

import * as React from 'react'
import {cx} from 'linaria'
import {styled} from 'linaria/react'
import {useStore} from 'effector-react'
import {tab as _tab, tabApi} from './domain'
import {GraphiteView} from '../graphite/view'
import {Settings, flowToggle as _flowToggle} from '../settings'
import {TypeErrorsView} from '../flow/view'
import {Share} from '../share'
import Media from 'react-media'

const TabHeader = styled.li`
  border-right: 1px solid #ddd;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 7px 15px;
  margin: 0;
  background-color: ${({isActive}) => (isActive ? 'white' : 'inherit')};
`

export const TabsView = () => {
  const tab = useStore(_tab)
  const flowToggle = useStore(_flowToggle)
  return (
    <>
      <ul className={cx('toolbar', 'header-tabs')}>
        <Media query="(max-width: 699px)">
          <>
            <TabHeader onClick={tabApi.showEditor} isActive={tab === 'editor'}>
              Editor
            </TabHeader>
            <TabHeader
              onClick={tabApi.showOutline}
              isActive={tab === 'outline'}>
              Outline
            </TabHeader>
          </>
        </Media>
        {flowToggle && (
          <TabHeader onClick={tabApi.showErrors} isActive={tab === 'errors'}>
            Errors
          </TabHeader>
        )}
        <TabHeader onClick={tabApi.showDOM} isActive={tab === 'dom'}>
          DOM
        </TabHeader>
        <TabHeader onClick={tabApi.showShare} isActive={tab === 'share'}>
          Share
        </TabHeader>
        <TabHeader onClick={tabApi.showSettings} isActive={tab === 'settings'}>
          Settings
        </TabHeader>
      </ul>
      {tab === 'graphite' && <GraphiteView />}
      <div
        style={{visibility: tab === 'dom' ? 'visible' : 'hidden'}}
        className="dom">
        <iframe id="dom" />
      </div>
      {tab === 'share' && <Share />}
      {tab === 'settings' && <Settings />}
      {tab === 'errors' && <TypeErrorsView />}
    </>
  )
}
