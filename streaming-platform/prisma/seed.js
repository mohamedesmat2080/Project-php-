const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: 'أفلام أكشن', slug: 'action', description: 'أفلام الأكشن والمغامرات' },
    { name: 'أفلام كوميديا', slug: 'comedy', description: 'أفلام كوميدية ترفيهية' },
    { name: 'مسلسلات دراما', slug: 'drama', description: 'مسلسلات درامية مشوقة' },
    { name: 'أفلام رعب', slug: 'horror', description: 'أفلام الرعب والإثارة' },
    { name: 'وثائقيات', slug: 'documentary', description: 'أفلام وثائقية' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    })
  }

  const actionCat = await prisma.category.findUnique({ where: { slug: 'action' } })
  const comedyCat = await prisma.category.findUnique({ where: { slug: 'comedy' } })
  const dramaCat = await prisma.category.findUnique({ where: { slug: 'drama' } })

  const sampleVideos = [
    {
      title: 'المحارب الصامت',
      description: 'فيلم أكشن ومغامرات عن محارب يجب أن ينقذ مدينته من عصابة شريرة.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=640',
      videoUrl: '',
      embedCode: '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
      duration: 120,
      type: 'movie',
      genre: 'أكشن',
      rating: '8.5',
      releaseYear: 2024,
      maturityRating: 'PG-13',
      isPublished: true,
      categoryId: actionCat?.id,
    },
    {
      title: 'ضحك حتى البكاء',
      description: 'كوميديا رومانسية عن شاب يقع في حب فتاة من عائلة غريبة.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=640',
      videoUrl: '',
      embedCode: '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
      duration: 95,
      type: 'movie',
      genre: 'كوميديا',
      rating: '7.2',
      releaseYear: 2023,
      maturityRating: 'PG',
      isPublished: true,
      categoryId: comedyCat?.id,
    },
    {
      title: 'صراع العروش - الموسم الأول',
      description: 'مسلسل دراما تاريخي عن صراع العائلات على العرش.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1574375927938-5ff6a47ce8b9?w=640',
      videoUrl: '',
      embedCode: '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
      duration: 60,
      type: 'series',
      genre: 'دراما',
      rating: '9.3',
      releaseYear: 2024,
      maturityRating: 'R',
      isPublished: true,
      categoryId: dramaCat?.id,
    },
  ]

  for (const video of sampleVideos) {
    await prisma.video.upsert({
      where: { id: 'seed-' + video.title.replace(/\s/g, '-') },
      update: video,
      create: video,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })