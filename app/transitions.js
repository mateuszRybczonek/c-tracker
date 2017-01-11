export default function() {
  this.transition(
    this.fromRoute('snippets'),
    this.toRoute('contact'),
    this.use('toLeft', { duration: 500, easing: 'easeInOut' }),
    this.reverse('toRight', { duration: 500, easing: 'easeInOut' })
  );

  this.transition(
    this.fromRoute('certificates.index'),
    this.toRoute('certificates.new'),
    this.use('crossFade'),
    this.reverse('crossFade')
  );
}
