export default function ActualPanelShadow() {
  /* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */
  return (
    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
  )
}