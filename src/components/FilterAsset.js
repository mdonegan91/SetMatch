// import React from 'react';
// import PropTypes from 'prop-types';

// class FilterAsset extends React.Component {
//   tagRef = React.createRef();
//   statusRef = React.createRef();

//   static propTypes = {
//     filterAsset: PropTypes.func.isRequired
//   };

//   sortAsset = (e) => {
//     e.preventDefault();
//     const asset = {
//       tag: this.tagRef.current.value,
//       status: this.statusRef.current.value
//     };
//     this.props.filterAsset(asset);
//     e.currentTarget.reset();
//   };

//   render() {
//     return (
//       <form className="asset-edit" onSubmit={this.sortAsset}>
//         <select name="tag" ref={this.tagRef} >
//           <option value="bigs">Bigs</option>
//           <option value="smalls">Smalls</option>
//           <option value="artwork">Artwork</option>
//           <option value="fixtures">Fixtures</option>
//           <option value="softgoods">Soft Goods</option>
//         </select>
//         <select name="status" ref={this.statusRef} >
//           <option value="warehouse">Warehouse</option>
//           <option value="shop">Shop</option>
//           <option value="goldroom">Gold Room</option>
//           <option value="onset">On Set</option>
//         </select>
//       </form>
//     );
//   }
// }

// export default FilterAsset;