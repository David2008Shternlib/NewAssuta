"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/utm";

/**
 * Запоминает источник перехода при каждой загрузке страницы.
 *
 * Ничего не рисует. Стоит в общем макете, чтобы ловить метку независимо от
 * того, на какую страницу человек пришёл по ссылке блогера: это может быть
 * не только главная, но и страница направления или конкретного врача.
 *
 * Параметры адреса читаем напрямую из window, а не через useSearchParams:
 * этот хук требует обёртки Suspense и переводит ветку в клиентский рендер,
 * а выигрыша здесь не даёт — ссылок, меняющих только параметры, у нас нет.
 */
export default function UtmCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  return null;
}
