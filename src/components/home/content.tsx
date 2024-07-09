'use client';
import Link from 'next/link'
import { CardBalance1 } from './card-balance1';

export const Content = () => (
  <div className="h-full lg:px-6">
    <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
      <div className="mt-6 gap-6 flex flex-col w-full">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Expenses</h3>
          <Link href="/expenses">
          <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
            <CardBalance1 />
          </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
);
