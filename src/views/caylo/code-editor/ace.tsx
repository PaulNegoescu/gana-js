import * as React from 'react'
import * as ace from 'ace-builds'
import config from '../config'
import { AceProps } from './types'

import './editor.css'

import 'ace-builds/webpack-resolver'

export default class CayloAce extends React.Component<AceProps> {
  private elem: React.RefObject<HTMLDivElement>
  public static defaultProps: AceProps = config.editor.defaultProps
  private aceInstance: ace.Ace.Editor

  public constructor(props: any) {
    super(props)
    this.elem = React.createRef()
  }

  public componentDidMount() {
    this.aceInstance = ace.edit(
      this.elem.current as HTMLDivElement,
      this.validProps() as ace.Ace.EditorOptions,
    )
  }

  public componentDidUpdate() {
    this.aceInstance.setOptions(this.validProps())
  }

  public componentWillUnmount() {
    this.aceInstance.destroy()
  }

  private validProps() {
    const validProps = { ...this.props }
    delete validProps.baseClass

    return validProps
  }

  public render() {
    return (
      <div className={`${this.props.baseClass}__instance`} ref={this.elem} />
    )
  }
}