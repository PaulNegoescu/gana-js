import * as React from 'react';
import Ace from './ace.component';
import Controls from './controls';
import config from '../../../shared/config';
import { EditorProps, IQuirkContext } from '../../../shared/types';
import CodeEditorContext from '../../../shared/quirk.context';
import OutputBox from '../outputBox';
class CodeEditor extends React.Component<any, IQuirkContext> {
  public constructor(props: any) {
    super(props);
    this.state = {
      editorProps: {},
      onConfigurationChange: this.onConfigurationChange.bind(this),
    };
  }

  private onConfigurationChange(conf: string | EditorProps, value?: string) {
    /* tslint:disable */
    console.log('Conf change, code editor:', conf, value);
    if (typeof conf === 'string') {
      this.setState({
        editorProps: { ...this.state.editorProps, [conf]: value },
      });
      return;
    }
    this.setState({ editorProps: { ...this.state.editorProps, ...conf } });
  }

  errorAssign = () => {
    const err = new Error('Another one is wrong!');
    this.props.errorOut(err);
  };

  public render() {
    return (
      <CodeEditorContext.Provider value={this.state}>
        <div
          className={
            config.editor.className +
            'btn-toolbar justify-content-between bg-dark border-bottom border-light mt-2'
          }
          role="toolbar"
          aria-label="Code Editor Toolbar"
        >
          <Controls />
        </div>
        <div className="border border-dark">
          <Ace />
          <button onClick={this.errorAssign}>Error</button>
        </div>
      </CodeEditorContext.Provider>
    );
  }
}

export default CodeEditor;
