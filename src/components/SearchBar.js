import React, {useRef} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';

const SearchBar = (props) => {
    const { setSerchText } = props;
    const serchInput = useRef();
    const addSerchText = () => {
        setSerchText(serchInput.current.value.length > 2 ? serchInput.current.value: '');
    }

    return (
        <form className="pt-3">
            <div className="form-group">
            <label htmlFor="addInput">Search in todos: </label>
            <input
                ref={serchInput}
                id="addInput"
                type="text"
                className="form-control"
                placeholder="New todo name"
                onChange={addSerchText}
            />
            </div>
        </form>
    )
}

const mapStateToProps = state => ({
    serchText: state.serchText,
  });
  
  const mapDispatchToProps = dispatch => {
    const { setSerchText } = bindActionCreators(
      actions,
      dispatch
    );
  
    return {
        setSerchText: text => setSerchText(text),
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);