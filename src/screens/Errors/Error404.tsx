import { A } from '@solidjs/router'
import type { Component } from 'solid-js'

export const Error404: Component = () => {
    return (
        <div class="container mx-auto">
            <div class="flex items-center justify-center h-screen gap-4">
                <section class=" dark:bg-gray-900">
                    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div class="mx-auto max-w-screen-sm text-center">
                            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                                404
                            </h1>
                            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                                Что-то пошло не так.
                            </p>
                            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                                Кажется, мы не смогли найти эту страницу. Возвращайтесь на{' '}
                                <A href="/" class="text-blue-500">
                                    главную
                                </A>{' '}
                                страницу
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
